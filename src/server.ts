import { createServer } from "http";
import app from "./app";
import { connectDB } from "./mongodb";
const PORT = process.env.PORT || 4000;
const server = createServer(app.callback());

(async () => {
  await connectDB();
  console.log("mongo connected");
  server.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
  });
})();
