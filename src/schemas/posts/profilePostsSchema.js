import * as yup from "yup";

const profilePostsSchema = yup.object({
  params: yup.object({
    userId: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid id")
      // .required()
      .label("Id"),
  }),
});

export default profilePostsSchema;
