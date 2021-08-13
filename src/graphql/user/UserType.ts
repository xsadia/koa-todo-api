import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";
import { nodeInterface } from "../node/nodeDefinition";

export const UserType: any = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => ({
        id: globalIdField('User'),
        /* _id: {
            type: GraphQLString,
            resolve: user => user._id
        }, */
        username: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: user => user.username
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: user => user.email
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: user => user.password
        },
        todos: {
            type: new GraphQLNonNull(GraphQLList(GraphQLString)),
            resolve: user => user.todos
        }
    }),
    interfaces: () => [nodeInterface]
});

const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
    name: 'User',
    nodeType: UserType
});

export {
    UserConnection,
    UserEdge
};