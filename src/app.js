import express from "express";
import cors from "cors";
import morgan from "morgan";
import { validationResult } from "express-validator";

import { httpError } from "./utils/errors";

import authRoutes from "./routes/authRoutes";
import postsRoutes from "./routes/postsRoutes";
import commentsRoutes from "./routes/commentsRoutes";
import cookieParser from "cookie-parser";

const app = express();

// settings
app.set("port", process.env.PORT || 8080);

// middlewares
app.use(cors());
app.use("/static", express.static("public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const json = {
    status: err.status || 500,
    message: err.message,
  };

  if (err.errors) {
    json.errors = err.errors;
  }

  res.status(err.status || 500).json(json);
});

export default app;
