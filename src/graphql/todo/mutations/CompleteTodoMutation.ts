import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { Todo } from "../../../models/Todo";

export default mutationWithClientMutationId({
    name: 'CompleteTodo',
    description: 'Complete Todo Mutation',
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

        const todo = await Todo.findOne({ _id: id });

        todo.isCompleted = !todo.isCompleted;

        await todo.save();

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