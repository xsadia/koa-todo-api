import { GraphQLObjectType } from "graphql";
import TodoSubscriptions from "../todo/subscriptions";

export const SubscriptionType = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    ...TodoSubscriptions,
  },
});
