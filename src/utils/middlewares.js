import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user.model';
import { httpError, clearYupPath } from './errors';

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, { abortEarly: false });

    next();
  } catch (err) {

    const errors = err.inner.reduce((acc, { path, errors }) => {
      errors.forEach(e => {
        acc.push({
          field: clearYupPath(path),
          message: e,
        });
      });

      return acc;
    }, []);

    next(httpError(400, "Validation error", errors));
  }
};


export const verifyToken = (roles = []) => async (req, res, next) => {
    const authorization = req.header('authorization');

    if (!authorization) {
      return next(httpError(401, "No token provided"));
    }

    try {
        const token = authorization.replace('Bearer ', '');
        const verified = jwt.verify(token, config.tokenSecret);
        console.log("jwt", verified);

        const user = await User.findWithRoles(verified.id);
        if (!user) {
          return next(httpError(401, "User not found"));
        }

        // console.log("roles", user);

        if (roles.length > 0 && !user.roles.some(role => roles.includes(role.code))) {
          return next(httpError(403, "User not authorized"));
        }

        req.user = user;
        next()
    } catch (error){
        console.log("verifyToken error", error);
        next(httpError(401, "Invalid token"));
    }
}

export const verifyCookie = async (req, res, next) => {
  try {
      const token = req.cookies.token;
      if (!token) {
        return next(httpError(401, "No token provided"));
      }

      const verified = jwt.verify(token, config.tokenSecret);
      console.log("jwt", verified);

      const user = await User.findWithRoles(verified.id);
      if (!user) {
        return next(httpError(401, "User not found"));
      }

      req.user = user;
      next()
  } catch (error){
      console.log("verifyCookie error", error);
      next(httpError(401, "Invalid token"));
  }
}