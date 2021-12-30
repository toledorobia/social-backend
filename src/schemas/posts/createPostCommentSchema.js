import * as yup from "yup";

const createPostCommentSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid id")
      .required()
      .label("Id"),
  }),
  body: yup.object({
    content: yup.string().required().label("Name"),
  }),
});

export default createPostCommentSchema;
