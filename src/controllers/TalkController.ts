import TalkService from "../services/TalkService.ts";

// @desc Get all talks
// @route GET /api/v1/talks
async function getTalks(ctx: any) {
  const searchParams = ctx.request.url.search;
  let talks = await TalkService.index();

  if (searchParams.includes("recommended=true")) {
    const user = ctx.request.headers.get("user_id");
    talks = await TalkService.index(user);
  }

  ctx.status = 200;
  ctx.response.body = {
    success: true,
    length: talks?.length,
    data: talks || [],
  };
}

// @desc Get single talk
// @route GET /api/v1/talks/:id
async function getTalk(ctx: any) {
  const { id } = ctx.params;
  const talk = await TalkService.show(id);

  if (talk) {
    ctx.status = 200;
    ctx.response.body = {
      success: true,
      data: talk,
    };
  } else {
    ctx.status = 404;
    ctx.response.body = {
      success: false,
      error: `Cannot find talk with id ${id}`,
    };
  }
}

// @desc Add a new talk
// @route POST /api/v1/talks
async function addTalk(ctx: any) {
  const body = await ctx.request.body();
  const speaker = await ctx.request.headers.get("speaker_id");

  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = {
      sucess: false,
      error: `Please provide a title, description, speaker, link, duration and topic`,
    };
  } else {
    const { title, description, link, duration, topics } = body.value;
    const talk = await TalkService.store({
      title,
      description,
      speaker,
      link,
      duration,
      topics: topics.split(","),
    });

    ctx.status = 201;
    ctx.response.body = {
      success: true,
      data: talk,
    };
  }
}

// @desc Update talk
// @route PUT /api/v1/talks/:id
async function updateTalk(ctx: any) {
  const { id } = ctx.params;
  const body = await ctx.request.body();
  const speaker = await ctx.request.headers.get("speaker_id");

  const updateData: {
    title?: string;
    description?: string;
    link?: string;
    duration?: string;
    topics?: string[];
  } = body.value;

  if (updateData) {
    const talk = await TalkService.update(id, speaker, updateData);

    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      data: talk,
    };
  }
}

// @desc Delete talk
// @route DELETE /api/v1/talks/:id
async function deleteTalk(ctx: any) {
  const { id } = ctx.params;
  const speaker = await ctx.request.headers.get("speaker_id");

  await TalkService.destroy(id, speaker);

  ctx.status = 204;
  ctx.response.body = {
    success: true,
  };
}

export { getTalks, getTalk, addTalk, deleteTalk, updateTalk };
