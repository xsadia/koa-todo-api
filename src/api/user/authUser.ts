import { compare } from "bcryptjs";
import { Context } from "koa";
import { User } from "../../models/User";
import { authConfig } from '../../config/authConfig';
import { sign } from "jsonwebtoken";

export const authUser = async (ctx: Context) => {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
        ctx.status = 401;
        ctx.body = {
            error: 'E-mail and password are required'
        };

        return;
    }

    const user = await User.findOne({ email });

    if (!user) {
        ctx.status = 401;
        ctx.body = {
            error: 'Incorrect e-mail/password combination'
        };

        return;
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
        ctx.status = 401;
        ctx.body = {
            error: 'Incorrect e-mail/password combination'
        };

        return;
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
        subject: user._id.toString(),
        expiresIn
    });

    ctx.status = 200;
    ctx.body = {
        token
    };

    return;
};