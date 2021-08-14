import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { Todo } from "../../../models/Todo";
import { User } from "../../../models/User";
import { TodoType } from "../TodoType";

export default mutationWithClientMutationId({
    name: 'CreateTodo',
    description: 'Create Todo Mutation',
    inputFields: {
        content: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    mutateAndGetPayload: async ({ content }, { user }) => {

        if (!user) {
            return {
                created: false,
                error: 'Permission denied'
            };
        }

        const todoOwner = await User.findOne({ _id: user._id });

        const todo = new Todo({
            owner: todoOwner._id,
            content
        });

        await todo.save();

        todoOwner.todos.push(todo);

        await todoOwner.save();

        return {
            created: true,
            error: null
        };
    },
    outputFields: {
        created: {
            type: GraphQLBoolean,
            resolve: ({ created }) => created
        },
        error: {
            type: GraphQLString,
            resolve: ({ error }) => error
        }
    }
});