import * as yup from "yup";

const sendPasswordResetEmailSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required().label("Email"),
  }),
});

export default sendPasswordResetEmailSchema;
