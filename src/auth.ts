import { verify } from "jsonwebtoken";
import { authConfig } from "./config/authConfig";

type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
};

export const getUser = async (authorization: string | null | undefined) => {
  if (!authorization) return { user: null };
  try {
    const [, token] = authorization.split(" ");

    const { secret } = authConfig.jwt;
    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload;

    return {
      user: sub,
    };
  } catch (e) {
    return {
      user: null,
    };
  }
};
