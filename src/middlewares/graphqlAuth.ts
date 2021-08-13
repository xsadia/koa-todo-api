import { verify } from 'jsonwebtoken';
import { User } from '../models/User';
import { authConfig } from '../config/authConfig';

export const getUser = async (token: string) => {
    if (!token) {
        return {
            user: null,
        };
    }

    try {
        const [, jwtoken] = token.split(' ');
        const decoedToken = verify(jwtoken, authConfig.jwt.secret);
        const user = await User.findOne({ _id: decoedToken.sub });

        const userWithoutPassword = {
            _id: user._id,
            username: user.username,
            email: user.email,
            todos: user.todos
        };

        return {
            user: userWithoutPassword,
        };
    } catch {
        return {
            user: null,
        };
    }
};