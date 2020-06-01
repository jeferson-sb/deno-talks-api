import LikeService from '../services/LikeService.ts';

// @desc Add like to talk
// @route POST /api/v1/talks/:id/like
async function addLike(ctx: any) {
  const talkId = ctx.params.id;
  const user = await ctx.request.headers.get('user_id');
  const talk = await LikeService.store(talkId, user);

  ctx.status = 200;
  ctx.response.body = {
    success: true,
    data: talk,
  };
}

export { addLike };
