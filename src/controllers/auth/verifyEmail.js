import { User } from "../../models";
import { HttpException } from "../../libs/errors";

const verifyEmail = async (req, res, next) => {
  try {
    const { id, hash } = req.params;

    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new HttpException(401, "User not found");
    }

    if (user.emailVerified === true) {
      throw new HttpException(401, "User already verified");
    }

    if (user.hashMail !== hash) {
      throw new HttpException(401, "Invalid hash");
    }

    user.emailVerified = true;
    user.hashMail = null;
    await user.save();

    res.json({ status: true });
  } catch (error) {
    next(error);
  }
};

export default verifyEmail;
