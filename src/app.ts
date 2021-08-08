import Koa from 'koa';
import convert from 'koa-convert';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import { todoRouter } from './routes/todo.routes';
import { userRouter } from './routes/users.routes';

const app = new Koa();

app.use(bodyParser());
app.use(convert(cors()));

app.use(todoRouter.routes())
    .use(todoRouter.allowedMethods());

app.use(userRouter.routes())
    .use(userRouter.allowedMethods());

export default app;