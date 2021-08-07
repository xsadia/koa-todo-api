import { Context } from "koa";
import { Todo } from "../../models/Todo";
import { User } from "../../models/User";

export const getAllTodos = async (ctx: Context) => {
    const loggedUser = ctx.user;

    const user = await User.findOne({ _id: loggedUser._id });

    if (!user) {
        ctx.status = 404;
        ctx.body = {
            error: 'User not found'
        };

        return;
    }

    const todos = await Todo.find({ owner: loggedUser._id })
        .sort('-createdAt');

    ctx.status = 200;
    ctx.body = {
        todos
    };

    return;
};