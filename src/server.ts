import { createServer } from 'http';
import app from './app';
import { connectDB } from './mongodb';

const server = createServer(app.callback());

(async () => {
    await connectDB();
    console.log('mongo connected');
    server.listen(process.env.PORT || 4000, () => {
        console.log('Server running http://localhost:4000');
    });
})();