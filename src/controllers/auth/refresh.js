import config from "../../config";
import { User } from "../../models";
import { HttpException } from "../../libs/errors";
import { setRefreshToken, verifyToken, getTokens } from "../../libs/tokens";

const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.token;
    console.log("refreshToken", refreshToken);
    if (!refreshToken) {
      throw new HttpException(401, "No refresh token provided");
    }

    const verified = verifyToken(refreshToken, config.tokenSecret);
    if (verified === false || verified.refresh !== true) {
      throw new HttpException(401, "Refresh token invalid");
    }

    const user = await User.findOne({ _id: verified.id });
    if (!user) {
      throw new HttpException(401, "User not found");
    }

    const { token: newToken, refreshToken: newRefreshToken } = getTokens(
      {
        id: user._id,
        email: user.email,
      },
      config.tokenSecret
    );

    setRefreshToken(req, res, newRefreshToken);
    res.json({ status: true, token: newToken });
  } catch (error) {
    next(error);
  }
};

export default refresh;
