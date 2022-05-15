import { subscriptionWithClientId } from "graphql-relay-subscription";
import { TodoType } from "../TodoType";
import pubSub, { EVENTS } from "../../../pubSub";
import { fromGlobalId } from "graphql-relay";
import { Todo } from "../../../models/Todo";

export default subscriptionWithClientId({
  name: "NewTodo",
  inputFields: {},
  outputFields: {
    todo: {
      type: TodoType,
      resolve: async ({ id }) => {
        const todo = await Todo.findOne({ _id: id }).populate("owner");
        return todo;
      },
    },
  },
  subscribe: (input, context) => {
    console.log("subscription new todo", input, context);
    return pubSub.asyncIterator(EVENTS.TODO.NEW);
  },
  getPayload: (obj) => {
    return {
      id: obj.todoId,
    };
  },
});
