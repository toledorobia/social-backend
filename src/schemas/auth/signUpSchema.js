import * as yup from "yup";

const signUpSchema = yup.object({
  body: yup.object({
    name: yup.string().required().label("Name"),
    email: yup.string().email().required().label("Email"),
    password: yup.string().min(6).required().label("Password"),
  }),
});

export default signUpSchema;
