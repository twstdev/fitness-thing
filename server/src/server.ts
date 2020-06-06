import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import body from 'koa-body';
import session from 'koa-session';
import passport from 'koa-passport';

import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import { UserRouter } from "./routers/user_router";
import { User } from "./entity/User";

const options: ConnectionOptions = {
  type: "postgres",
  database: "fitrack",
  host: "database-1.cxufgqdsghez.us-east-2.rds.amazonaws.com",
  password: "N115yZtK",
  port: 5432,
  username: "postgres",
  entities: [User],
}

createConnection(options).then(async connection => {
  const app = new Koa();
  const port = process.env['PORT'] || 3000;

  app.context['connection'] = connection;

  app.keys = ['WQ2kZ8EyGY7RzCutN6iKQT*cip_sc-!LZL@Bg8!TuoauEaF!m@']

  app.use(body());
  app.use(json());
  app.use(logger());
  app.use(session({}, app));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(UserRouter.routes()).use(UserRouter.allowedMethods());

  app.listen(port, () => {
    console.log('Koa server started on :3000');
  });
}).catch(error => console.log(error));
