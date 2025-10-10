import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { createHash } from 'crypto';

export interface CurrentUserData {
  userId: string;
  orgId: string;
  email: string;
  role: string;
  permissions: string[];
}

/**
 * Sanctum Auth Guard with Token Caching
 *
 * Flow:
 * 1. First request: Validate token via Laravel API → Cache result
 * 2. Subsequent requests: Use cached data (skip Laravel API call)
 * 3. Cache TTL: 10 minutes (configurable)
 */
@Injectable()
export class SanctumAuthGuard implements CanActivate {
  private readonly laravelApiUrl: string;
  private readonly cacheTTL: number = 600000; // 10 minutes in milliseconds

  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.laravelApiUrl =
      this.configService.get<string>('LARAVEL_API_URL') ||
      'http://localhost:8000';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Create a hash of the token for cache key (don't store raw token)
      const tokenHash = this.hashToken(token);
      const cacheKey = `sanctum_token:${tokenHash}`;

      // Try to get cached user data
      const cachedUser = await this.cacheManager.get<CurrentUserData>(cacheKey);

      if (cachedUser) {
        // Cache hit - use cached data
        request.user = cachedUser;
        return true;
      }

      // Cache miss - validate with Laravel API
      const userData = await this.validateTokenWithLaravel(token);

      // Cache the validated user data
      await this.cacheManager.set(cacheKey, userData, this.cacheTTL);

      // Attach user to request
      request.user = userData;
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Token validation failed',
      );
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private async validateTokenWithLaravel(
    token: string,
  ): Promise<CurrentUserData> {
    const response = await fetch(
      `${this.laravelApiUrl}/api/auth/validate-token`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const data = await response.json();

    if (!data.valid) {
      throw new UnauthorizedException('Invalid token');
    }

    return {
      userId: data.user.userId,
      orgId: data.user.orgId,
      email: data.user.email,
      role: data.user.role,
      permissions: data.user.permissions || [],
    };
  }
}
