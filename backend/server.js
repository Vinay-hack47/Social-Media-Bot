// import express from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./db/connectDB.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import userRouter from "./routes/user.routes.js";
// import postRouter from "./routes/post.routes.js";
// import testRedis from './routes/testRedis.js';
// import twitterRoute from "./routes/twitter.js";
// import twitterAuthRoute from "./routes/twitterAuth.js";
// import scheduleRoute from "./routes/scheduleRoutes.js";
// import "./cron/cron.js"; // ⏰ Cron job will auto-start on import

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// const corsOptions = {
//   origin: "http://localhost:5173", // frontend origin
//   credentials: true,
// };
// app.use(cors(corsOptions));

// // Basic route
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // API Routes
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/posts", postRouter);
// app.use("/api/v1/twitter", twitterRoute);
// app.use("/api/v1/twitterAuth", twitterAuthRoute);
// app.use("/api/v1/redis", testRedis);
// app.use("/api/v1/schedule", scheduleRoute);

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });




import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import testRedis from './routes/testRedis.js';
import twitterRoute from "./routes/twitter.js";
import twitterAuthRoute from "./routes/twitterAuth.js";
import scheduleRoute from "./routes/scheduleRoutes.js";
import { job } from "./cron/cron.js"; // 👈 Import but don’t run here

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/twitter", twitterRoute);
app.use("/api/v1/twitterAuth", twitterAuthRoute);
app.use("/api/v1/redis", testRedis);
app.use("/api/v1/schedule", scheduleRoute);

// ✅ Connect to DB, then start server + cron
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    job.start(); // ✅ Start the cron only after DB is connected
    console.log("⏰ Cron job started!");
  });
}).catch((err) => {
  console.error("❌ Failed to connect to DB:", err.message);
});
