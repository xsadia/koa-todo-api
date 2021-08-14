import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionArgs, connectionDefinitions, connectionFromArray, globalIdField } from "graphql-relay";
import { nodeInterface } from "../node/nodeDefinition";
import { TodoConnection } from "../todo/TodoType";
import * as TodoLoader from '../todo/TodoLoader';

export const UserType: any = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => ({
        id: globalIdField('User'),
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
            type: new GraphQLNonNull(TodoConnection),
            args: connectionArgs,
            resolve: async (user, args, context: any) => {
                const todos = await TodoLoader.loadAll(user._id);

                return connectionFromArray(todos, args);
            }
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