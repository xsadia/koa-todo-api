import { Context } from "koa";
import { User } from "../../models/User";

export const deleteUser = async (ctx: Context) => {
    const loggedUser = ctx.user;
    const { id } = ctx.params;

    if (loggedUser._id !== id) {
        ctx.status = 401;
        ctx.body = {
            error: 'You don\'t have permission to delete this user'
        };

        return;
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
        ctx.status = 404;
        ctx.body = {
            error: 'User not found'
        };

        return;
    }

    await user.delete();

    ctx.status = 204;

    return;
};