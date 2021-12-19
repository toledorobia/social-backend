import * as yup from "yup";

const resetPasswordSchema = yup.object({
  body: yup.object({
    id: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid id")
      .required()
      .label("Id"),
    hash: yup
      .string()
      .matches(/^[0-9a-fA-F]{64}$/, "Invalid hash")
      .required()
      .label("Hash"),
    password: yup.string().min(6).required().label("Password"),
  }),
});

export default resetPasswordSchema;
