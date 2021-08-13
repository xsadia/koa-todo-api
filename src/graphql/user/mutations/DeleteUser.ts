import { GraphQLBoolean, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { User } from "../../../models/User";

export default mutationWithClientMutationId({
    name: 'DeleteUser',
    description: 'Delete User Mutation',
    inputFields: {

    },
    mutateAndGetPayload: async () => {

        /* const user = await User.findOne({ _id: id });

        if (!user) {
            return {
                success: false,
                error: 'User not found'
            };
        }

        await user.delete();

        return {
            success: true,
            error: null
        }; */
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