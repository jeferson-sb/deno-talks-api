import iro, { bold, bgGreen } from "https://deno.land/x/iro/src/iro.ts";

export default async function (ctx: any, next: any) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(
    `${iro(` ${ctx.request.method} `, bgGreen, bold)} ${
      ctx.request.url
    } ${ms}ms`
  );
}
