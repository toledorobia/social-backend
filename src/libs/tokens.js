import jwt from "jsonwebtoken";
import config from "../config";
import dayjs from "./dayjs";
import { HttpException } from "./errors";

export const getTokens = (payload, secret) => {
  const token = jwt.sign(payload, secret, { expiresIn: 300 });

  payload.refresh = true;
  const refreshToken = jwt.sign(payload, secret, {
    expiresIn: "7d",
  });

  return { token, refreshToken };
};

export const verifyToken = (token, secret) => {
  try {
    const verified = jwt.verify(token, secret);
    if (verified === false) {
      throw new Error("Token invalid");
    }

    if (dayjs.unix(verified.exp).diff(dayjs()) < 1) {
      throw new Error("Token expired");
    }

    return verified;
  } catch (error) {
    throw new HttpException(401, error.message);
  }
};

export const setRefreshToken = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    path: "/api/auth/refresh",
    secure: true,
    // secure: config.env == "prod",
  });
};

export const removeRefreshToken = (res) => {
  res.clearCookie("token", {
    path: "/api/auth/refresh",
  });
};
