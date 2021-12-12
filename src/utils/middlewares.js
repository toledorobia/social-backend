import express from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { User, Token } from "../models";
import { httpError, clearYupPath } from "./errors";
import { sha256 } from "./helpers";

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      { abortEarly: false }
    );

    next();
  } catch (err) {
    const errors = err.inner.reduce((acc, { path, errors }) => {
      errors.forEach((e) => {
        acc.push({
          field: clearYupPath(path),
          message: e,
        });
      });

      return acc;
    }, []);

    next(httpError(400, "Validation error", errors));
  }
};

export const verifyToken =
  (roles = []) =>
  async (req, res, next) => {
    const authorization = req.header("authorization");

    if (!authorization) {
      return next(httpError(401, "No token provided"));
    }

    try {
      const token = authorization.replace("Bearer ", "");
      const verified = jwt.verify(token, config.tokenSecret);
      // console.log("jwt", verified);

      const user = await User.findOne({ _id: verified.id });
      if (!user) {
        return next(httpError(401, "User not found"));
      }

      const dbToken = await Token.findOne({
        user: user._id,
        token: sha256(token),
      });

      if (!dbToken || dbToken.expired) {
        return next(httpError(401, "User not found"));
      }

      req.user = user;
      next();
    } catch (error) {
      console.log("verifyToken error", error);
      next(httpError(401, "Invalid token"));
    }
  };
