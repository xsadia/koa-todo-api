import Router from 'koa-router';
import { completeTodo } from '../api/todos/completeTodo';
import { createTodo } from '../api/todos/createTodo';
import { deleteTodo } from '../api/todos/deleteTodo';
import { editTodo } from '../api/todos/editTodo';
import { getAllTodos } from '../api/todos/getAllTodos';
import { getSingleTodo } from '../api/todos/getSingleTodo';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const todoRouter = new Router({
    prefix: '/todos'
});

todoRouter.get('/', ensureAuthenticated, getAllTodos);

todoRouter.get('/:id', ensureAuthenticated, getSingleTodo);

todoRouter.post('/', ensureAuthenticated, createTodo);

todoRouter.patch('/:id/complete', ensureAuthenticated, completeTodo);

todoRouter.patch('/:id', ensureAuthenticated, editTodo);

todoRouter.delete('/:id', ensureAuthenticated, deleteTodo);