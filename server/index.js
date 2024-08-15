import Express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import likeRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import db from "./connect.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = Express();
const port = 8800;

// Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", true);
  next();
});
app.use(Express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// Database connection
db.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.stack);
    process.exit(1);
  } else {
    console.log("Connected to the database.");

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/posts", postRoutes);
    app.use("/api/likes", likeRoutes);
    app.use("/api/comments", commentRoutes);

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
});
