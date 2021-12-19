import { User } from "../../models";
import { HttpException } from "../../libs/errors";
import { generateUniqueId } from "../../libs/helpers";
import { sendPasswordResetEmail as sendEmail } from "../../libs/email";

const sendPasswordResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpException(401, "User not found");
    }

    const hash = generateUniqueId();
    user.hashPasswordRecovery = hash;
    await user.save();

    sendEmail(user.id, user.email, hash);

    res.json({ status: true });
  } catch (error) {
    next(error);
  }
};

export default sendPasswordResetEmail;
