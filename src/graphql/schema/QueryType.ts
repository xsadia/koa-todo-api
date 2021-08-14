import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";
import { UserConnection, UserType } from "../user/UserType";
import * as UserLoader from '../user/UserLoader';
import { nodeField, nodesField } from "../node/nodeDefinition";
import { TodoConnection, TodoType } from "../todo/TodoType";
import * as TodoLoader from '../todo/TodoLoader';

export const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'The root of all queries',
    fields: () => ({
        node: nodeField,
        nodes: nodesField,
        users: {
            type: new GraphQLNonNull(UserConnection),
            args: connectionArgs,
            resolve: async (root, args, context) => {
                const data = await UserLoader.loadAll();
                return connectionFromArray(data, args);
            }
        },
        user: {
            type: UserType,
            resolve: async (root, args, context: any) => {
                if (context.user) {
                    const data = await UserLoader.loadSingle(context.user._id);

                    return data;
                }

                return;
            },
        },
        todos: {
            type: new GraphQLNonNull(TodoConnection),
            args: connectionArgs,
            resolve: async (root, args, context: any) => {
                if (context.user) {
                    const data = await TodoLoader.loadAll(context.user._id);

                    return connectionFromArray(data, args);
                }

                return;
            }
        },
        todo: {
            type: TodoType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (root, args, context: any) => {
                if (context.user) {
                    const data = await TodoLoader.load(context.user._id, args.id);

                    return data;
                }

                return;
            }
        }
    })
});