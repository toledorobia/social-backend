import express from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import config from "../config";
import { User, Token } from "../models";
import { httpError, clearYupPath } from "./errors";
import { sha256 } from "./helpers";
import { verifyToken as verifyTokenFunc } from "./tokens";

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
    const authorization = req.header("Authorization");

    if (!authorization) {
      return next(httpError(401, "No token provided"));
    }

    try {
      const token = authorization.replace("Bearer ", "");
      const verified = verifyTokenFunc(token, config.tokenSecret);
      if (verified === false) {
        return next(httpError(401, "Invalid token"));
      }

      const user = await User.findOne({ _id: verified.id });
      if (!user) {
        return next(httpError(401, "User not found"));
      }

      const dbToken = await Token.findOne({
        user: user._id,
        authToken: sha256(token),
      });

      if (!dbToken || dbToken.expired) {
        return next(httpError(401, "Token not valid."));
      }

      req.user = user;
      next();
    } catch (error) {
      console.log("verifyToken error", error);
      next(httpError(401, "Invalid token"));
    }
  };
