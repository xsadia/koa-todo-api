import { GraphQLObjectType } from "graphql";
import UserMutations from '../user/mutations';
import TodoMutations from '../todo/mutations';

export const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root of all mutation',
    fields: () => ({
        ...UserMutations,
        ...TodoMutations
    })
});