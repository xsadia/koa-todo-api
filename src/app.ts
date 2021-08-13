import Koa from 'koa';
import convert from 'koa-convert';
import cors from 'koa-cors';
import Router from 'koa-router';
import graphqlHttp from 'koa-graphql';
import bodyParser from 'koa-bodyparser';
import { todoRouter } from './routes/todo.routes';
import { userRouter } from './routes/users.routes';
import { schema } from './graphql/schema';
import { ensureAuthenticatedGraphql } from './middlewares/ensureAuthenticatedGraphql';

const app = new Koa();
const router = new Router();

router.use(ensureAuthenticatedGraphql);

router.all('/graphql', graphqlHttp({
    schema,
    graphiql: true
}));

app.use(bodyParser());
app.use(convert(cors()));

app.use(todoRouter.routes())
    .use(todoRouter.allowedMethods());

app.use(userRouter.routes())
    .use(userRouter.allowedMethods());

app.use(router.routes())
    .use(router.allowedMethods());

export default app;