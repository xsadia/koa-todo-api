import { verify } from "jsonwebtoken";
import { Context, Next } from "koa";
import { authConfig } from "../config/authConfig";

type TokenPayload = {
    iat: number;
    exp: number;
    sub: string;
};

export const ensureAuthenticatedGraphql = (ctx: Context, next: Next) => {
    const authorizationHeader = ctx.header.authorization;

    if (!authorizationHeader) {
        ctx.isAuth = false;

        return next();
    }

    const [, token] = authorizationHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        ctx.isAuth = true;

        ctx.user = {
            _id: sub
        };

        return next();
    } catch {
        ctx.isAuth = false;

        return next();
    }
};