import * as yup from "yup";

const verifyEmailSchema = yup.object({
  params: yup.object({
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
  }),
});
export default verifyEmailSchema;
