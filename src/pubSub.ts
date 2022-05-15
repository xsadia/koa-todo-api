import { PubSub } from "graphql-subscriptions";

export const EVENTS = {
  TODO: {
    NEW: "TODO_NEW",
  },
};

export default new PubSub();
