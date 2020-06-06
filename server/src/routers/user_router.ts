import Router from 'koa-router';
import { ExtendableContext, Next } from "koa";
import { User } from "../entity/User";

const UserRouter = new Router();

UserRouter
    .get('/all_users', async (ctx: ExtendableContext, next: Next) => {
      const users = User.find();
      ctx.body = {users};
      return next();
    })
    .post('/', async (ctx: ExtendableContext, next: Next) => {
      let newUser = new User();
      const {email, password, confirmedPassword, name, age} = ctx.body;

      let validation;
      try {
        validation = await User.validateSchema({email, password, confirmedPassword, name, age});
      } catch (e) {
        throw new Error(e);
      }

      if (validation.errors || validation.error) {
        ctx.body = validation;
        return next();
      }

      newUser.age = age;
      newUser.email = email;
      newUser.name = name;
      newUser.password = await newUser.hashPassword(password);

      ctx.body = { ...newUser };
      return next();
    })
    .get('/:id', async (ctx: ExtendableContext, next: Next) => {
      ctx.body = {msg: 'Hello world!'};
      await next();
    })

export { UserRouter };
