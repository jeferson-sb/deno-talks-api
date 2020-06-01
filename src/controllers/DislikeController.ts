import DislikeService from "../services/DislikeService.ts";

// @desc Add dislike to talk
// @route POST /api/v1/talks/:id/dislike
async function addDislike(ctx: any) {
  const talkId = ctx.params.id;
  const user = await ctx.request.headers.get("user_id");
  const talk = await DislikeService.store(talkId, user);

  ctx.status = 200;
  ctx.response.body = {
    success: true,
    data: talk,
  };
}

export { addDislike };
