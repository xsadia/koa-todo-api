import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";
import { nodeInterface } from "../node/nodeDefinition";
import { UserType } from "../user/UserType";

export const TodoType: any = new GraphQLObjectType({
    name: 'Todo',
    description: 'Todo type',
    fields: () => ({
        id: globalIdField('Todo'),
        content: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: todo => todo.content
        },
        owner: {
            type: UserType,
            resolve: todo => todo.owner
        },
        isCompleted: {
            type: new GraphQLNonNull(GraphQLBoolean),
            resolve: todo => todo.isCompleted
        },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: todo => todo.createdAt
        }
    }),
    interfaces: () => [nodeInterface]
});

const { connectionType: TodoConnection, edgeType: TodoEdge } = connectionDefinitions({
    name: 'Todo',
    nodeType: TodoType
});

export {
    TodoConnection,
    TodoEdge
};