import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";
import { UserConnection, UserType } from "../user/UserType";
import * as UserLoader from '../user/UserLoader';
import { nodeField, nodesField } from "../node/nodeDefinition";

export const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'The root of all queries',
    fields: () => ({
        node: nodeField,
        nodes: nodesField,
        users: {
            type: GraphQLNonNull(UserConnection),
            args: connectionArgs,
            resolve: async (_, args) => {
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
        }
    })
});