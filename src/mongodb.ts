import { connect, connection } from 'mongoose';
export const connectDB = async () => {

    await connect('mongodb://localhost:27017/todos_koa', {
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
};

export const connectTestDB = async () => {
    await connect('mongodb://localhost:27017/todos_koa_tests', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
};