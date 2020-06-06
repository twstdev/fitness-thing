import Router from 'koa-router';
import { ExtendableContext, Next } from "koa";

const UserRouter = new Router();

UserRouter
    .post('/', async (ctx: ExtendableContext, next: Next) => {
      ctx.body = {};
      await next();
    })
    .get('/:id', async (ctx: ExtendableContext, next: Next) => {
      ctx.body = {msg: 'Hello world!'};
      await next();
    })

export { UserRouter };
