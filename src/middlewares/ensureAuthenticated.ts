import { verify } from "jsonwebtoken";
import { Context, Next } from "koa";
import { authConfig } from "../config/authConfig";

type TokenPayload = {
    iat: number;
    exp: number;
    sub: string;
};

export const ensureAuthenticated = (ctx: Context, next: Next) => {
    const authorizationHeader = ctx.header.authorization;

    if (!authorizationHeader) {
        ctx.status = 401;
        ctx.body = {
            error: 'Authorization header missing.'
        };

        return;
    }

    const [, token] = authorizationHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        ctx.user = {
            _id: sub
        };

        return next();
    } catch {
        ctx.throw(401, 'Invalid JWT token');
    }
};