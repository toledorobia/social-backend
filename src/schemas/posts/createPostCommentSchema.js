import yup from "../../libs/yup";

const createPostCommentSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .mongodbId("Invalid id")
      .required()
      .label("Id"),
  }),
  body: yup.object({
    content: yup.string().required().label("Name"),
  }),
});

export default createPostCommentSchema;
