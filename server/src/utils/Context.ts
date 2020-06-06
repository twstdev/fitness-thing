import * as Koa from 'koa'
import { Connection } from "typeorm";

declare module 'koa' {
  interface Ctx extends Koa.ExtendableContext {
    connection: Connection
  }
}
