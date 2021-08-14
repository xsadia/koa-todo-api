import { fromGlobalId, nodeDefinitions } from "graphql-relay";
import { Todo } from "../../models/Todo";
import { User } from "../../models/User";
import { TodoType } from "../todo/TodoType";
import { UserType } from "../user/UserType";

export const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
    async (globalId) => {
        const { type, id } = fromGlobalId(globalId);
        if (type === 'User') {
            return await User.findOne({ _id: id });
        }

        if (type === 'Todo') {
            return await Todo.findOne({ _id: id });
        }

        return null;
    },
    (obj) => {
        if (obj instanceof User) {
            return UserType;
        }

        if (obj instanceof Todo) {
            return TodoType;
        }

        return null;
    }
);