import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { Todo } from "../../../models/Todo";

export default mutationWithClientMutationId({
    name: 'DeleteTodo',
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    mutateAndGetPayload: async ({ id }, { user }) => {

        if (!user) {
            return {
                success: false,
                error: 'Permission denied'
            };
        }

        const todo = await Todo.findOne({ _id: id });

        if (!todo) {
            return {
                success: false,
                error: 'Todo not found'
            };
        }

        if (!todo.owner.equals(user._id)) {
            return {
                success: false,
                error: 'Permission denied'
            };
        }

        await todo.delete();

        return {
            success: true,
            error: null
        };
    },
    outputFields: {
        success: {
            type: GraphQLBoolean,
            resolve: ({ success }) => success
        },
        error: {
            type: GraphQLString,
            resolve: ({ error }) => error
        }
    }
});