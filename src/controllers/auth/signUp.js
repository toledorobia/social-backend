import bcrypt from "bcrypt";
import { User } from "../../models";
import { HttpException } from "../../libs/errors";
import { generateUniqueId } from "../../libs/helpers";
import { sendVerifyEmail } from "../../libs/email";

const signUp = async (req, res, next) => {
  try {
    const { name, email, password: plainPassword } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      throw new HttpException(409, "User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(plainPassword, salt);
    const hashMail = generateUniqueId();

    const user = new User({
      name,
      email,
      password: passwordHash,
      avatar: null,
      hashMail,
    });

    await user.save();

    await sendVerifyEmail(user._id, email, hashMail);

    res.json({
      status: true,
      user: user.cleanObject(),
    });
  } catch (error) {
    next(error);
  }
};

export default signUp;
