import config from "../config";
import { User } from "../models";
import { HttpException, clearYupPath } from "./errors";
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

    // next(httpError(400, "Validation error", errors));
    next(new HttpException(400, "Validation error", errors));
  }
};

export const verifyToken = () => async (req, res, next) => {
    const authorization = req.header("Authorization");

    try {
      if (!authorization) {
        throw new HttpException(401, "No token provided");
      }

      const token = authorization.replace("Bearer ", "");
      const verified = verifyTokenFunc(token, config.tokenSecret);
      const user = await User.findOne({ _id: verified.id });

      if (!user) {
        throw new HttpException(401, "User not found");
      }

      req.user = user;
      next();
    } catch (error) {
      console.log("verifyToken error", error);
      next(error);
    }
  };
