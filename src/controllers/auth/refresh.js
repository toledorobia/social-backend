import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { User, Token } from "../../models";
import { httpError } from "../../utils/errors";
import { sha256 } from "../../utils/helpers";
import { setRefreshToken, verifyToken, getTokens } from "../../utils/tokens";

const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.token;
    if (!refreshToken) {
      return next(httpError(401, "No token provided"));
    }

    const tokenDb = await Token.findOne({ refreshToken: sha256(refreshToken) });
    if (!tokenDb) {
      return next(httpError(401, "Refresh token invalid"));
    }

    if (tokenDb.isExpired()) {
      return next(httpError(401, "Refresh token expired"));
    }

    const verified = verifyToken(refreshToken, config.tokenSecret);
    if (verified === false || verified.refresh !== true) {
      await tokenDb.setExpired();
      return next(httpError(401, "Refresh token invalid"));
    }

    const user = await User.findOne({ _id: verified.id });
    if (!user) {
      await tokenDb.setExpired();
      return next(httpError(401, "User invalid"));
    }

    //console.log(verified, user, tokenDb);
    if (!user._id.equals(tokenDb.user)) {
      await tokenDb.setExpired();
      return next(httpError(401, "User and token invalid"));
    }

    await tokenDb.setExpired();

    const { token: newToken, refreshToken: newRefreshToken } = getTokens(
      {
        id: user._id,
        email: user.email,
      },
      config.tokenSecret
    );

    const newTokenDb = new Token({
      authToken: sha256(newToken),
      refreshToken: sha256(newRefreshToken),
      user: user._id,
    });

    await newTokenDb.save();

    setRefreshToken(res, newRefreshToken);
    res.json({ status: true, token: newToken });
  } catch (error) {
    next(httpError(500, error.message));
  }
};

export default refresh;
