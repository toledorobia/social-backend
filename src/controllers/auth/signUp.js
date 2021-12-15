import bcrypt from "bcrypt";
import { User } from "../../models";
import { httpError } from "../../utils/errors";

const signUp = async (req, res, next) => {
  const { name, email, password: plainPassword } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return next(httpError(409, "User already exists"));
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(plainPassword, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
    avatar: null,
  });

  await user.save();

  const { password, deleted, ...ouser } = user.toObject();
  res.json(ouser);
};

export default signUp;
