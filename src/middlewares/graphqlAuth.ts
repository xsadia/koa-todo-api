import { verify } from "jsonwebtoken";
import { User } from "../models/User";
import { authConfig } from "../config/authConfig";
import { Context, Next } from "koa";

type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
};

export const authMiddleWare = async (ctx: Context, next: Next) => {
  try {
    const authorizationHeader = ctx.header.authorization;

    if (!authorizationHeader) {
      ctx.user = {
        id: null,
      };

      return await next();
    }

    const [, token] = authorizationHeader.split(" ");

    const { secret } = authConfig.jwt;
    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload;

    ctx.user = {
      _id: sub,
    };

    return await next();
  } catch (e) {
    ctx.user = {
      _id: null,
    };

    return await next();
  }
};

// export const getUser = async (token: string) => {
//     if (!token) {
//         return {
//             user: null,
//         };
//     }

//     try {
//         const [, jwtoken] = token.split(' ');
//         const decoedToken = verify(jwtoken, authConfig.jwt.secret);
//         const user = await User.findOne({ _id: decoedToken.sub });

//         const userWithoutPassword = {
//             _id: user._id,
//             username: user.username,
//             email: user.email,
//             todos: user.todos
//         };

//         return {
//             user: userWithoutPassword,
//         };
//     } catch {
//         return {
//             user: null,
//         };
//     }
// };
