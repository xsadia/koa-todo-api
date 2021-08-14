import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { Todo } from "../../../models/Todo";

export default mutationWithClientMutationId({
    name: 'DeleteTodo',
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    mutateAndGetPayload: async ({ id: globalId }, { user }) => {

        if (!user) {
            return {
                success: false,
                error: 'Permission denied'
            };
        }

        const { id } = fromGlobalId(globalId);

        console.log(id);

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