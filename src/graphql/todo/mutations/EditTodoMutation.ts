import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { Todo } from "../../../models/Todo";
import { load } from "../TodoLoader";
import { TodoEdge, TodoType } from "../TodoType";

export default mutationWithClientMutationId({
    name: 'EditTodo',
    description: 'Edit Todo Mutation',
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        content: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    mutateAndGetPayload: async ({ id, content }, { user }) => {

        if (!user) {
            return {
                todo: null,
                error: 'Permission denied'
            };
        }

        const todo = await Todo.findOne({ _id: id });

        if (!todo) {
            return {
                todo: null,
                error: 'Todo not found'
            };
        }

        if (!todo.owner.equals(user._id)) {
            return {
                todo: null,
                error: 'Permission denied'
            };
        }

        todo.content = content;

        await todo.save();

        return {
            todo,
            error: null
        };
    },
    outputFields: {
        todo: {
            type: TodoEdge,
            resolve: ({ todo }) => {
                if (!todo) {
                    return null;
                }

                return {
                    cursor: toGlobalId('Todo', todo._id),
                    node: todo
                };
            }
        },
        error: {
            type: GraphQLString,
            resolve: ({ error }) => error
        }
    }
});