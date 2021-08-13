import { compare } from "bcryptjs";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { User } from "../../../models/User";
import { authConfig } from '../../../config/authConfig';
import { sign } from 'jsonwebtoken';

export default mutationWithClientMutationId({
    name: 'AuthUser',
    description: 'Authenticate User Mutation',
    inputFields: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    mutateAndGetPayload: async ({ email, password }) => {
        const user = await User.findOne({ email: email });

        if (!user) {
            return {
                token: null,
                error: 'Incorrect e-mail/password combination'
            };
        }

        const passwordMatch = await compare(password, user?.password);

        if (!passwordMatch) {
            return {
                token: null,
                error: 'Incorrect e-mail/password combination'
            };
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user._id.toString(),
            expiresIn
        });

        return {
            token,
            error: null
        };
    },
    outputFields: {
        token: {
            type: GraphQLString,
            resolve: ({ token }) => token
        },
        error: {
            type: GraphQLString,
            resolve: ({ error }) => error
        }
    }
});