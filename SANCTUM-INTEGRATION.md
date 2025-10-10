# Laravel Sanctum Integration Guide

This document explains how the NestJS ATS backend validates Laravel Sanctum tokens with caching for optimal performance.

## Architecture Overview

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Frontend  │──1──>│  NestJS ATS  │──2──>│   Laravel   │
│  (Chokusai) │      │   Backend    │      │   Backend   │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            │ 3. Cache
                            ▼
                     ┌──────────────┐
                     │  In-Memory   │
                     │    Cache     │
                     └──────────────┘
```

### Flow:
1. **Frontend** sends request with Sanctum bearer token
2. **NestJS** checks cache:
   - **Cache HIT**: Use cached user data (skip Laravel call)
   - **Cache MISS**: Validate with Laravel API → Cache result
3. **Cache TTL**: 10 minutes (configurable)

## Benefits

✅ **Performance**: Only 1 API call to Laravel per token (every 10 min)
✅ **Separate Databases**: No direct database connection needed
✅ **Security**: Token hash used as cache key (raw token not stored)
✅ **Scalability**: Easy to extract into microservices later

## Laravel Backend Setup

You need to create a validation endpoint in your Laravel backend.

### 1. Create Controller

Create: `/Users/gen/corekara/platform-backend/app/Http/Controllers/Api/AuthValidationController.php`

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthValidationController extends Controller
{
    /**
     * Validate Sanctum token and return user info for ATS backend
     */
    public function validateToken(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'valid' => false,
                'message' => 'Invalid or expired token'
            ], 401);
        }

        return response()->json([
            'valid' => true,
            'user' => [
                'userId' => (string) $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'role' => $user->role ?? 'VIEWER',
                'orgId' => (string) ($user->organization_id ?? $user->company_id ?? ''),
                'permissions' => $this->getUserPermissions($user),
            ]
        ]);
    }

    private function getUserPermissions($user): array
    {
        $rolePermissions = [
            'admin' => ['candidates:read', 'candidates:write', 'candidates:delete'],
            'recruiter' => ['candidates:read', 'candidates:write'],
            'interviewer' => ['candidates:read'],
            'viewer' => ['candidates:read'],
        ];

        $role = strtolower($user->role ?? 'viewer');
        return $rolePermissions[$role] ?? ['candidates:read'];
    }
}
```

### 2. Add Route

Add to `routes/api.php`:

```php
use App\Http\Controllers\Api\AuthValidationController;

// Sanctum protected route for token validation
Route::middleware('auth:sanctum')->get('/auth/validate-token', [
    AuthValidationController::class,
    'validateToken'
]);
```

### 3. Configure CORS (if needed)

In `config/cors.php`, ensure ATS backend is allowed:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],

'allowed_origins' => [
    'http://localhost:3001',  // Add ATS backend
    // ... other origins
],
```

## NestJS Backend Configuration

### 1. Environment Variables

Update `/Users/gen/Code/nuxt-ats/.env`:

```env
LARAVEL_API_URL=http://localhost:8000
```

### 2. Using the Guard

The `SanctumAuthGuard` is already implemented. Controllers use it like this:

```typescript
import { SanctumAuthGuard } from '../common/guards/sanctum-auth.guard';

@Controller('candidates')
@UseGuards(SanctumAuthGuard)  // Apply to whole controller
export class CandidatesController {
  @Get()
  async list(@CurrentUser('orgId') orgId: string) {
    // orgId is from cached/validated token
  }
}
```

### 3. Cache Configuration

Cache TTL can be adjusted in `app.module.ts`:

```typescript
CacheModule.register({
  isGlobal: true,
  ttl: 600000, // 10 minutes (in milliseconds)
}),
```

## Testing

### 1. Get a Sanctum Token from Laravel

```bash
# Login to Laravel and get token
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Response will include token:
# { "token": "1|xxxxxxxxxxx..." }
```

### 2. Test ATS Endpoint with Token

```bash
curl -X GET http://localhost:3001/api/candidates \
  -H "Authorization: Bearer 1|xxxxxxxxxxx..."
```

### 3. Verify Caching

**First request**: Check Laravel logs → Should see `/api/auth/validate-token` hit
**Second request** (within 10 min): No Laravel API call → Uses cache

## Cache Invalidation

Cache is automatically invalidated:
- After 10 minutes (TTL expires)
- When token changes
- When app restarts

To manually clear cache (optional):

```typescript
// Inject cache manager
constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

// Clear all
await this.cacheManager.reset();

// Clear specific token
const tokenHash = createHash('sha256').update(token).digest('hex');
await this.cacheManager.del(`sanctum_token:${tokenHash}`);
```

## Security Notes

1. ✅ **Token not stored in cache** - Only SHA256 hash used as key
2. ✅ **HTTPS in production** - Always use SSL
3. ✅ **Short TTL** - 10 min means fresh validation every 10 min
4. ✅ **Token in headers** - Never in URL params
5. ✅ **Laravel handles auth** - Centralized auth logic

## Troubleshooting

### Token validation fails
- Check Laravel `/api/auth/validate-token` endpoint exists
- Verify `LARAVEL_API_URL` in .env is correct
- Ensure token is not expired in Laravel DB
- Check CORS configuration

### Cache not working
- Verify CacheModule is imported in app.module.ts
- Check cache TTL configuration
- Look for memory issues if cache is large

### Performance issues
- Increase cache TTL if acceptable for your use case
- Consider Redis for distributed caching (future)
- Monitor Laravel API response times

## Migration to Microservices (Future)

When extracting ATS to separate service:
1. Keep this validation endpoint
2. Add Redis for distributed cache
3. Consider API gateway for routing
4. Use message queue for async operations
