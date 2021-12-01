import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import User from '../../models/user.model';
import Role from '../../models/role.model';
import Token from '../../models/token.model';
import { httpError } from '../../utils/errors';


export const signUp = async (req, res, next) => {
  const { name, email, password: plainPassword } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return next(httpError(409, 'User already exists'));
  }

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(plainPassword, salt);

  const roleCustomer = await Role.findOne({ code: 'customer' });
  if (!roleCustomer) {
    return next(httpError(500, 'Role customer not found'));
  }

  const user = new User({
    name,
    email,
    password: passwordHash,
    roles: [{
      name: roleCustomer.name,
      code: roleCustomer.code,
    }],
  });

  await user.save();

  const { password, deleted, roles, ...ouser } = user.toObject();
  res.json(ouser);
}

export const signIn = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(httpError(401, 'User or password invalid'));
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return next(httpError(401, 'User or password invalid'));
  }

  let duration = 86400;
  if (rememberMe === true) {
    duration = 604800;
  }

  const token = jwt.sign({
    id: user._id,
    email: user.email,
  }, config.tokenSecret, { expiresIn: duration });

  res
    .cookie('token', token, {
      httpOnly: true,
      maxAge: duration,
      secure: process.env.NODE_ENV === "production",
    })
    .json({ status: true, message: "Sign in successfully" });
}

export const signOut = async (req, res, next) => {
  res
    .clearCookie('token')
    .json({ status: true, message: "Sign out successfully" });
};

export const test = async (req, res, next) => {
  res.json({ status: true });
}