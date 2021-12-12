import * as yup from "yup";

const signInSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required().label("Email"),
    password: yup.string().required().label("Password"),
    rememberMe: yup.boolean().default(false).label("Remember me"),
  }),
});

export default signInSchema;
