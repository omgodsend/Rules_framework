import { connectDB } from "./db";

(async () => {
    await connectDB();
})();