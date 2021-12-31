import yup from "../../libs/yup";

const verifyEmailSchema = yup.object({
  params: yup.object({
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
  }),
});
export default verifyEmailSchema;
