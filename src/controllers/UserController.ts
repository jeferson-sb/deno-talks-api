import UserService from '../services/UserService.ts';

// @desc Get all users
// @route GET /api/v1/users
async function getUsers(ctx: any) {
  const users = await UserService.index();

  ctx.status = 200;
  ctx.response.body = {
    success: true,
    length: users?.length,
    data: users || [],
  };
}

// @desc Create user
// @route POST /api/v1/users
async function registerUser(ctx: any) {
  const body = await ctx.request.body();

  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = {
      sucess: false,
      error: "User body can't be empty",
    };
  } else {
    const { name, topics } = body.value;
    const user = await UserService.create({
      name,
      topics: topics.split(','),
    });

    ctx.status = 201;
    ctx.response.body = {
      success: true,
      data: user,
    };
  }
}

export { getUsers, registerUser };
