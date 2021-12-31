import express from "express";
import cors from "cors";
import morgan from "morgan";

import testRoutes from "./routes/testRoutes";
import authRoutes from "./routes/authRoutes";
import usersRoutes from "./routes/usersRoutes";
import postsRoutes from "./routes/postsRoutes";
import cookieParser from "cookie-parser";

const app = express();

// settings
app.set("port", process.env.PORT || 8080);

// middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/static", express.static("public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log("error catch", err);
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
