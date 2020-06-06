import Router from 'koa-router';
import { ExtendableContext, Next } from "koa";
import { User } from "../entity/User";

const UserRouter = new Router({
  prefix: '/users'
});

UserRouter
    .get('/all_users', async (ctx: ExtendableContext, next: Next) => {
      const users = User.find();
      ctx.body = {users};
      return next();
    });

UserRouter.post('/', async (ctx: ExtendableContext, next: Next) => {
  let newUser = new User();

  let validation;
  try {
    console.log(ctx.request.body);
    validation = await User.validateSchema(ctx.request.body);
  } catch (e) {
    throw new Error(e);
  }

  console.log(validation);

  if (validation.errors || validation.error) {
    ctx.body = validation;
    return next();
  }

  newUser.age = ctx.request.body.age;
  newUser.email = ctx.request.body.email;
  newUser.name = ctx.request.body.name;
  newUser.password = await newUser.hashPassword(ctx.request.body.password);

  ctx.body = {...newUser, password: null};
  return next();
});

UserRouter.get('/:id', async (ctx: ExtendableContext, next: Next) => {
  ctx.body = {msg: 'Hello world!'};
  await next();
})

export { UserRouter };
