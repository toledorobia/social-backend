import * as yup from "yup";

const getPostCommentsSchema = yup.object({
  params: yup.object({
    postId: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid id")
      .required()
      .label("Id"),
  }),
});

export default getPostCommentsSchema;
