import { Context } from "koa";
import { Todo } from "../../models/Todo";

export const completeTodo = async (ctx: Context) => {
    const { id } = ctx.params;
    const loggedUser = ctx.user;

    try {
        const todo = await Todo.findOne({ _id: id });

        if (!todo?.owner.equals(loggedUser._id)) {
            ctx.status = 401;
            ctx.body = {
                error: 'You don\'t have permission to complete this todo'
            };

            return;
        }

        if (todo.isCompleted) {

            todo.isCompleted = false;
            await todo.save();

            ctx.status = 204;
            return;
        }

        todo.isCompleted = true;
        await todo.save();

        ctx.status = 204;
        return;
    } catch {
        ctx.throw(404, 'Todo not found');
    }
};