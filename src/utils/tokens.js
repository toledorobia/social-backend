import jwt from "jsonwebtoken";

export const getTokens = (payload, secret) => {
  const token = jwt.sign(payload, secret, { expiresIn: 30 });

  payload.refresh = true;
  const refreshToken = jwt.sign(payload, secret, {
    expiresIn: "6h",
  });

  return { token, refreshToken };
};

export const verifyToken = (token, secret) => {
  try {
    const verified = jwt.verify(token, secret);
    return verified;
  } catch (error) {
    return false;
  }
};

export const setRefreshToken = (res, token) => {
  console.log("setRefreshToken", token);
  res.cookie("token", token, {
    httpOnly: true,
    path: "/api/auth/refresh",
    //secure: process.env.NODE_ENV === "production",
  });
};
