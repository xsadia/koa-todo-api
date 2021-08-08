import { Context } from "koa";
import { Todo } from "../../models/Todo";
import { User } from "../../models/User";

export const createTodo = async (ctx: Context) => {
    const loggedUser = ctx.user;
    const { content } = ctx.request.body;
    const user = await User.findOne({ _id: loggedUser._id });

    if (!user) {
        ctx.status = 404;
        ctx.body = {
            error: 'User not found'
        };

        return;
    }

    const todo = new Todo({
        owner: user._id,
        content,
    });

    await todo.save();

    user.todos.push(todo._id);

    await user.save();

    ctx.status = 201;
    ctx.body = {
        todo
    };

    return;
};