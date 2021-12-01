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
    roles: [roleCustomer._id],
  });

  await user.save();

  const { password, deleted, ...ouser } = user.toObject();
  res.json(ouser);
}

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(httpError(401, 'User or password invalid'));
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return next(httpError(401, 'User or password invalid'));
  }

  const token = jwt.sign({
    id: user._id,
    email: user.email,
  }, config.tokenSecret, { expiresIn: '1h' });

  const refreshToken = jwt.sign({
    id: user._id,
    email: user.email,
    refresh: true,
  }, config.tokenSecret, { expiresIn: '6h' });

  const tokenDb = new Token({
    authToken: token,
    refreshToken,
    user: user._id,
  });

  await tokenDb.save();

  res.json({ status: true, token, refreshToken });
}

export const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;

  console.log(req.body);

  const tokenDb = await Token.findOne({ refreshToken });
  if (!tokenDb) {
    return next(httpError(401, 'Refresh token invalid'));
  }

  if (tokenDb.isExpired()) {
    return next(httpError(401, 'Refresh token expired'));
  }

  const verified = jwt.verify(refreshToken, config.tokenSecret);
  if (verified.refresh !== true) {
    await tokenDb.setExpired();
    return next(httpError(401, 'Refresh token invalid'));
  }
  
  const user = await User.findOne({ _id: verified.id });
  if (!user) {
    await tokenDb.setExpired();
    return next(httpError(401, 'User invalid'));
  }
  
  //console.log(verified, user, tokenDb);
  if (!user._id.equals(tokenDb.user)) {
    await tokenDb.setExpired();
    return next(httpError(401, 'User and token invalid'));
  }

  await tokenDb.setExpired();

  const newToken = jwt.sign({
    id: user._id,
    email: user.email,
  }, config.tokenSecret, { expiresIn: '1h' });

  const newRefreshToken = jwt.sign({
    id: user._id,
    email: user.email,
    refresh: true,
  }, config.tokenSecret, { expiresIn: '6h' });

  const newTokenDb = new Token({
    authToken: newToken,
    refreshToken: newRefreshToken,
    user: user._id,
  });

  await newTokenDb.save();

  res.json({ status: true, token: newToken, refreshToken: newRefreshToken });
}

export const test = async (req, res, next) => {
  res.json({ status: true });
}