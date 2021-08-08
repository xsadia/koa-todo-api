import { createServer } from 'http';
import app from './app';
import { connectDB } from './mongodb';

const server = createServer(app.callback());

(async () => {
    await connectDB();
    console.log('mongo connected');
    server.listen(3333, () => {
        console.log('Server running http://localhost:3333');
    });
})();