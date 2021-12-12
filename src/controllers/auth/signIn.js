import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import config from "../../config";
import { User, Token } from "../../models";
import { httpError } from "../../utils/errors";
import { sha256 } from "../../utils/helpers";

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

  // const oldToken = await Token.findOne({ user: user._id, expired: false });
  // if (oldToken) {
  //   oldToken.expired = true;
  //   await oldToken.save();
  // }

  await Token.updateMany({ user: user._id, expired: false }, { expired: true });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    config.tokenSecret,
    { expiresIn: "10h" }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      refresh: true,
    },
    config.tokenSecret,
    { expiresIn: "6h" }
  );

  const tokenDb = new Token({
    authToken: sha256(token),
    refreshToken: sha256(refreshToken),
    user: user._id,
  });

  await tokenDb.save();

  res.json({ status: true, token, refreshToken });
};

export default signIn;
