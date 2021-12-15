import * as yup from "yup";

const deleteCommentSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid id")
      .required()
      .label("Id"),
  }),
});

export default deleteCommentSchema;
