import bcrypt from "bcrypt";
import config from "../../config";
import { User } from "../../models";
import { HttpException } from "../../libs/errors";
import { getTokens, setRefreshToken } from "../../libs/tokens";

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpException(401, "User or password invalid");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new HttpException(401, "User or password invalid");
    }

    if (user.emailVerified === false) {
      throw new HttpException(401, "User not verified");
    }

    const { token, refreshToken } = getTokens(
      {
        id: user._id,
        email: user.email,
      },
      config.tokenSecret
    );

    setRefreshToken(req, res, refreshToken);
    res.json({ status: true, user: user.cleanObject(), token });
  } catch (error) {
    next(error);
  }
};

export default signIn;
