import { User } from '../../models/User';
import { Context } from 'koa';
import { hash } from 'bcryptjs';

export const createUser = async (ctx: Context) => {
    const { email, username, password } = ctx.request.body;
    const emailExists = await User.findOne({ email });

    if (emailExists) {
        ctx.status = 400;
        ctx.body = {
            error: 'E-mail already in use'
        };

        return;
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
        ctx.status = 400;
        ctx.body = {
            error: 'Username already in use'
        };

        return;
    }

    const hashedPassword = await hash(password, 8);

    const user = new User({
        email,
        username,
        password: hashedPassword
    });

    await user.save();

    ctx.status = 201;

    ctx.body = {
        created: 'OK'
    };

    return;
};