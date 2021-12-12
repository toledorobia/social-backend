import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { User, Token } from "../../models";
import { httpError } from "../../utils/errors";
import { sha256 } from "../../utils/helpers";

const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;

  console.log(req.body);

  const tokenDb = await Token.findOne({ refreshToken: sha256(refreshToken) });
  if (!tokenDb) {
    return next(httpError(401, "Refresh token invalid"));
  }

  if (tokenDb.isExpired()) {
    return next(httpError(401, "Refresh token expired"));
  }

  const verified = jwt.verify(refreshToken, config.tokenSecret);
  if (verified.refresh !== true) {
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

  const newToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    config.tokenSecret,
    { expiresIn: "1h" }
  );

  const newRefreshToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      refresh: true,
    },
    config.tokenSecret,
    { expiresIn: "6h" }
  );

  const newTokenDb = new Token({
    authToken: sha256(newToken),
    refreshToken: sha256(newRefreshToken),
    user: user._id,
  });

  await newTokenDb.save();

  res.json({ status: true, token: newToken, refreshToken: newRefreshToken });
};

export default refresh;
