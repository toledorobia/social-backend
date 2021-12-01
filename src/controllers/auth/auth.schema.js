import * as yup from 'yup';

export const signUpSchema = yup.object({
  body: yup.object({
    name: yup.string().required().label('Name'),
    email: yup.string().email().required().label('Email'),
    password: yup.string().min(8).required().label('Password'),
  })
});

export const signInSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required().label('Email'),
    password: yup.string().required().label('Password'),
    rememberMe: yup.boolean().default(false).label('Remember me'),
  })
});

export const refreshSchema = yup.object({
  body: yup.object({
    refreshToken: yup.string().required().label('Refresh Token'),
  })
});