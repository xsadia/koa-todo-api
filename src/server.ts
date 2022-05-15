import app from "./app";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { subscribe, execute } from "graphql";
import { schema } from "./graphql/schema";
import { createServer } from "http";
import { connectDB } from "./mongodb";
import { getUser } from "./auth";

type ConnectionParams = {
  Authorization?: string;
};

const PORT = process.env.PORT || 4000;
const server = createServer(app.callback());

(async () => {
  await connectDB();
  console.log("mongo connected");
  server.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
  });

  SubscriptionServer.create(
    {
      onConnect: async (connectionParams: ConnectionParams) => {
        const { user } = await getUser(connectionParams.Authorization);

        return {
          user,
        };
      },
      onDisconnect: () => console.log("Client subscription disconnected"),
      execute,
      subscribe,
      schema,
    },
    {
      server,
      path: "/subscriptions",
    }
  );
})();
