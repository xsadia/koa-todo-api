import Koa, { Context, Request, Response } from "koa";
import convert from "koa-convert";
import cors from "@koa/cors";
import Router from "@koa/router";
import { graphqlHTTP, OptionsData } from "koa-graphql";
import bodyParser from "koa-bodyparser";
import koaPlayground from "graphql-playground-middleware-koa";
import { todoRouter } from "./routes/todo.routes";
import { userRouter } from "./routes/users.routes";
import { schema } from "./graphql/schema";
import { authMiddleWare } from "./middlewares/graphqlAuth";

const app = new Koa();
const router = new Router();

const graphqlSettingsPerReq = async (
  req: Request,
  _: Response,
  ctx: Context
): Promise<OptionsData> => {
  const { user } = ctx;
  return {
    graphiql: false,
    schema,
    pretty: true,
    context: {
      user,
      req,
    },
    customFormatErrorFn: ({ message, locations, stack }) => {
      console.log(message);
      console.log(locations);
      console.log(stack);

      return {
        message,
        locations,
        stack,
      };
    },
  };
};

const graphqlServer = graphqlHTTP(graphqlSettingsPerReq);

router.all("/graphql", graphqlServer);
router.all(
  "/graphql/playground",
  koaPlayground({
    endpoint: "/graphql",
    subscriptionEndpoint: "/subscriptions",
  })
);

app.use(authMiddleWare);
app.use(bodyParser());
app.use(convert(cors()));

app.use(todoRouter.routes()).use(todoRouter.allowedMethods());

app.use(userRouter.routes()).use(userRouter.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

export default app;
