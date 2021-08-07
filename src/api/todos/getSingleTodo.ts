import { Context } from "koa";
import { Todo } from "../../models/Todo";

export const getSingleTodo = async (ctx: Context) => {
    const { id } = ctx.params;
    const loggedUser = ctx.user;

    try {
        const todo = await Todo.findOne({ _id: id });

        if (!todo?.owner.equals(loggedUser._id)) {
            ctx.status = 401;
            ctx.body = {
                error: 'You don\'t have permission to access this todo'
            };

            return;
        }

        ctx.status = 200;
        ctx.body = {
            todo
        };

        return;

    } catch {
        ctx.throw(404, 'Todo not found');
    }
};