import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from "graphql";
import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId,
} from "graphql-relay";
import { Todo } from "../../../models/Todo";
import { TodoEdge } from "../TodoType";

export default mutationWithClientMutationId({
  name: "DeleteTodo",
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

    if (!todo) {
      return {
        success: false,
        error: "Todo not found",
      };
    }

    if (!todo.owner.equals(user._id)) {
      return {
        success: false,
        error: "Permission denied",
      };
    }

    await todo.delete();

    return {
      deletedTodo: id,
      success: true,
      error: null,
    };
  },
  outputFields: {
    deletedTodo: {
      type: GraphQLID,
      resolve: ({ deletedTodo }) =>
        deletedTodo ? toGlobalId("Todo", deletedTodo) : null,
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
