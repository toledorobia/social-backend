import yup from "../../libs/yup";

const profilePostsSchema = yup.object({
  params: yup.object({
    userId: yup
      .string()
      .mongodbId("Invalid id")
      // .required()
      .label("Id"),
  }),
});

export default profilePostsSchema;
