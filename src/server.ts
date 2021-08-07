import { createServer } from 'http';
import Koa from 'koa';
import convert from 'koa-convert';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import { connect, connection } from 'mongoose';
import { todoRouter } from './routes/todo.routes';
import { userRouter } from './routes/users.routes';

const app = new Koa();

app.use(bodyParser());
app.use(convert(cors()));

app.use(todoRouter.routes())
    .use(todoRouter.allowedMethods());

app.use(userRouter.routes())
    .use(userRouter.allowedMethods());

const server = createServer(app.callback());

connect('mongodb://localhost:27017/todos_koa', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

connection.on("error", err => {
    console.log("err", err);
});

connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
});


server.listen(3333, () => {
    console.log('Server running http://localhost:3333');
});