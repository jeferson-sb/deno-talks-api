import UserService from '../services/UserService.ts';

// @desc Get user profile
// @route GET /api/v1/profile
async function getProfile(ctx: any) {
  const user_id = await ctx.request.headers.get('user_id');
  const user = await UserService.showProfile(user_id);

  if (user) {
    ctx.status = 200;
    ctx.response.body = {
      success: true,
      data: user,
    };
  }
}

export { getProfile };
