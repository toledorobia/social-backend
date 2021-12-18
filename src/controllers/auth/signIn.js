import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import config from "../../config";
import { User, Token } from "../../models";
import { httpError } from "../../utils/errors";
import { sha256 } from "../../utils/helpers";
import { getTokens, setRefreshToken } from "../../utils/tokens";

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(httpError(401, "User or password invalid"));
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return next(httpError(401, "User or password invalid"));
  }

  await Token.updateMany({ user: user._id, expired: false }, { expired: true });

  const { token, refreshToken } = getTokens(
    {
      id: user._id,
      email: user.email,
    },
    config.tokenSecret
  );

  const tokenDb = new Token({
    authToken: sha256(token),
    refreshToken: sha256(refreshToken),
    user: user._id,
  });

  await tokenDb.save();

  const { deleted, password: passwordUser, ...userData } = user.toObject();

  setRefreshToken(res, refreshToken);
  res.json({ status: true, user: userData, token });
};

export default signIn;
