import express from "express";
import cors from "cors";
import morgan from "morgan";
import { validationResult } from "express-validator";

import { httpError } from "./utils/errors";

import TestRoutes from "./routes/test.routes";
import AuthRoutes from "./routes/auth.routes";
import ProductsRoutes from "./routes/products.routes";
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
app.use("/api/test", TestRoutes);
// app.use("/api/auth", AuthRoutes);
app.use("/api/products", ProductsRoutes);

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
