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
import { getUser } from './middlewares/graphqlAuth';

const app = new Koa();
const router = new Router();

//router.use(ensureAuthenticatedGraphql);

const graphqlSettingsPerReq = async (req) => {
    const { user } = await getUser(req.header.authorization);

    return {
        graphiql: true,
        schema,
        context: {
            user,
            req,
        },
        formatError: (error) => {
            console.log(error.message);
            console.log(error.locations);
            console.log(error.stack);

            return {
                message: error.message,
                locations: error.locations,
                stack: error.stack,
            };
        },
    };
};

const graphqlServer = graphqlHttp(graphqlSettingsPerReq);

router.all('/graphql', graphqlServer);

app.use(bodyParser());
app.use(convert(cors()));

app.use(todoRouter.routes())
    .use(todoRouter.allowedMethods());

app.use(userRouter.routes())
    .use(userRouter.allowedMethods());

app.use(router.routes())
    .use(router.allowedMethods());

export default app;