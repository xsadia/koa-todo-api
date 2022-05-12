import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from "graphql-relay";
import { Todo } from "../../../models/Todo";
import { load } from "../TodoLoader";
import { TodoEdge } from "../TodoType";

export default mutationWithClientMutationId({
  name: "CompleteTodo",
  description: "Complete Todo Mutation",
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ id: globalId }, { user }) => {
    if (!user) {
      return {
        success: false,
        error: "Permission denied",
      };
    }

    const { id } = fromGlobalId(globalId);

    const todo = await Todo.findOne({ _id: id });

    todo.isCompleted = !todo.isCompleted;

    await todo.save();

    return {
      todo,
      success: true,
      error: null,
    };
  },
  outputFields: {
    todoEdge: {
      type: TodoEdge,
      resolve: async ({ todo }, _, context) => {
        if (!todo) {
          return null;
        }

        const globalId = toGlobalId("Todo", todo._id);

        const newTodo = await load(context.user._id, globalId);

        return {
          cursor: toGlobalId("Todo", newTodo._id),
          node: newTodo,
        };
      },
    },
    success: {
      type: GraphQLBoolean,
      resolve: ({ success }) => success,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
