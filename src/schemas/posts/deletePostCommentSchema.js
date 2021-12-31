import yup from "../../libs/yup";

const deletePostCommentSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .mongodbId("Invalid id")
      .required()
      .label("Id"),
    commentId: yup
      .string()
      .mongodbId("Invalid comment id")
      .required()
      .label("Id"),
  }),
});

export default deletePostCommentSchema;
