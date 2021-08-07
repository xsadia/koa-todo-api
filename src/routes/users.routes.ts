import Router from 'koa-router';
import { authUser } from '../api/user/authUser';
import { createUser } from '../api/user/createUser';
import { deleteUser } from '../api/user/deleteUser';
import { getUser } from '../api/user/getUser';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const userRouter = new Router({
    prefix: '/users'
});

userRouter.get('/:id', ensureAuthenticated, getUser);

userRouter.post('/', createUser);

userRouter.post('/auth', authUser);

userRouter.delete('/delete/:id', ensureAuthenticated, deleteUser);
