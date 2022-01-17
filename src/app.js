import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import config from "./config";
import { limiter } from "./libs/middlewares";
import testRoutes from "./routes/testRoutes";
import authRoutes from "./routes/authRoutes";
import usersRoutes from "./routes/usersRoutes";
import postsRoutes from "./routes/postsRoutes";
import cookieParser from "cookie-parser";

const app = express();

// settings
app.set("port", config.port);

let origins = [];
if (config.env == "prod") {
  origins = ["https://social-jto-app.web.app", "https://social-jto-app.firebaseapp.com"];
}
else {
  origins = ["https://localhost:3000"];
}

// console.log("Origins", origins);

// middlewares
app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);
app.use("/static", express.static("public"));
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// limiter
app.use(limiter(false, 30, 60));

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
  // console.log("error catch", err);
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
