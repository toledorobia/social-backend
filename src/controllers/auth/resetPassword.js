import bcrypt from "bcrypt";
import { User } from "../../models";
import { HttpException } from "../../libs/errors";
// import { sendVerifyEmail } from "../../libs/email";

const resetPassword = async (req, res, next) => {
  try {
    const { id, hash, password } = req.body;
    console.log("data", req.body);

    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new HttpException(401, "User not found");
    }

    if (user.hashPasswordRecovery !== hash) {
      throw new HttpException(401, "Invalid hash");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
    user.hashPasswordRecovery = null;

    await user.save();

    // await sendVerifyEmail(user._id, email, hashMail);

    res.json({
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

export default resetPassword;
