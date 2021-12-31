import yup from "../../libs/yup";

const resetPasswordSchema = yup.object({
  body: yup.object({
    id: yup
      .string()
      .mongodbId("Invalid id")
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
