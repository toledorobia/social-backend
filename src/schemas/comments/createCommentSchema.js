import * as yup from "yup";

const createCommentSchema = yup.object({
  body: yup.object({
    postId: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid post id")
      .required()
      .label("Post ID"),
    content: yup.string().required().label("Name"),
  }),
});

export default createCommentSchema;
