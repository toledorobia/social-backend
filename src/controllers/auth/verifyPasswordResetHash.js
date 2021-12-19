import { User } from "../../models";
import { HttpException } from "../../libs/errors";

const verifyPasswordResetHash = async (req, res, next) => {
  try {
    const { id, hash } = req.params;

    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new HttpException(401, "User not found");
    }

    if (user.emailVerified === false) {
      throw new HttpException(401, "User not verified");
    }

    if (user.hashPasswordRecovery !== hash) {
      throw new HttpException(401, "Invalid hash");
    }

    res.json({ status: true });
  } catch (error) {
    next(error);
  }
};

export default verifyPasswordResetHash;
