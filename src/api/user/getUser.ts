import { Context } from "koa";
import { User } from "../../models/User";

export const getUser = async (ctx: Context) => {
    const { id } = ctx.params;
    const loggedUser = ctx.user;

    try {

        const user = await User.findOne({ _id: id });

        /*  if (!user) {
             ctx.status = 404;
             ctx.body = {
                 error: 'User not found'
             };
     
             return;
         } */

        if (!user?._id.equals(loggedUser._id)) {
            ctx.status = 401;
            ctx.body = {
                error: 'You don\'t have permission to access this user\'s information'
            };

            return;
        }

        const userWithoutPassword = {
            todos: user.todos,
            _id: user._id,
            email: user.email,
            username: user.username
        };

        ctx.status = 200;
        ctx.body = { user: userWithoutPassword };
        return;

    } catch {
        ctx.throw(404, 'User not found');
    }
};