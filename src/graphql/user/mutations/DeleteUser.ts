import { GraphQLBoolean, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { User } from "../../../models/User";

export default mutationWithClientMutationId({
    name: 'DeleteUser',
    description: 'Delete User Mutation',
    inputFields: {

    },
    mutateAndGetPayload: async (_, { user }) => {

        if (!user) {
            return {
                success: false,
                error: 'Permission denied'
            };
        }

        const userTobeDeleted = await User.findOne({ _id: user._id });

        console.log(userTobeDeleted);

        await userTobeDeleted.delete();

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