import { Application } from 'https://deno.land/x/oak/mod.ts';
import logging from './middleware/logging.ts';
import router from './router.ts';

const env = Deno.env.toObject();
const PORT = env.PORT || 3333;
const HOST = env.HOST || 'localhost';

const app = new Application();

app.use(logging).use(router.routes()).use(router.allowedMethods());

console.log(`Server is up and running on http://${HOST}:${PORT}`);

await app.listen(`${HOST}:${PORT}`);
