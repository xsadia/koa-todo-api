import { User } from "../../models/User";

export const loadAll = async () => {
    const users = await User.find();

    return users;
};

export const loadSingle = async (id: string) => {
    const user = await User.findOne({ _id: id });
    if (!user) {
        return null;
    }

    return user;
};