import { fromGlobalId, nodeDefinitions } from "graphql-relay";
import { User } from "../../models/User";
import { UserType } from "../user/UserType";

export const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
    async (globalId) => {
        const { type, id } = fromGlobalId(globalId);
        if (type === 'User') {
            return await User.findOne({ _id: id });
        }

        return null;
    },
    (obj) => {
        if (obj instanceof User) {
            return UserType;
        }

        return null;
    }
);