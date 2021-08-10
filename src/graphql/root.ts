import { User } from "../models/User";

export default {
    listUsers: async () => {
        return await User.find();
    }
};