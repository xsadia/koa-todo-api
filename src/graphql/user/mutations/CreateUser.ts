import { hash } from "bcryptjs";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { User } from "../../../models/User";
import { authConfig } from '../../../config/authConfig';
import { sign } from 'jsonwebtoken';

export default mutationWithClientMutationId({
    name: 'CreateUser',
    description: 'Create User Mutation',
    inputFields: {
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    mutateAndGetPayload: async ({ username, email, password }) => {
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return {
                token: null,
                error: 'Email already registered'
            };
        }

        const usernameExists = await User.findOne({ username });

        if (usernameExists) {
            return {
                token: null,
                error: 'Username already registered'
            };
        }

        const hashedPassword = await hash(password, 8);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user._id.toString(),
            expiresIn
        });

        return {
            token,
            error: null,
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