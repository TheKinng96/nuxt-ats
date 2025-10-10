import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface CurrentUserData {
  userId: string;
  orgId: string;
  email: string;
  role: string;
  permissions: string[];
}

/**
 * Decorator to get the current authenticated user from the request
 *
 * Usage in controller:
 * ```typescript
 * @Get()
 * @UseGuards(JwtAuthGuard)
 * async myRoute(@CurrentUser() user: CurrentUserData) {
 *   console.log(user.userId, user.orgId);
 * }
 * ```
 *
 * You can also get specific properties:
 * ```typescript
 * @Get()
 * @UseGuards(JwtAuthGuard)
 * async myRoute(@CurrentUser('orgId') orgId: string) {
 *   console.log(orgId);
 * }
 * ```
 */
export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as CurrentUserData;

    return data ? user?.[data] : user;
  },
);
