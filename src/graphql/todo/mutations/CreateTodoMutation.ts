import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { Todo } from "../../../models/Todo";
import { User } from "../../../models/User";
import { TodoEdge } from "../TodoType";
import { load } from "../TodoLoader";
import pubSub, { EVENTS } from "../../../pubSub";

export default mutationWithClientMutationId({
  name: "CreateTodo",
  description: "Create Todo Mutation",
  inputFields: {
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ content }, { user }) => {
    if (!user) {
      return {
        todo: null,
        created: false,
        error: "Permission denied",
      };
    }

    const todoOwner = await User.findOne({ _id: user._id });

    const todo = new Todo({
      owner: todoOwner._id,
      content,
    });

    await todo.save();

    todoOwner.todos.push(todo);

    await todoOwner.save();

    await pubSub.publish(EVENTS.TODO.NEW, { todoId: todo._id });

    return {
      todo,
      created: true,
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
    created: {
      type: GraphQLBoolean,
      resolve: ({ created }) => created,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
