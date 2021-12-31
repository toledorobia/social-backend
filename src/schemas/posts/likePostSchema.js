import yup from "../../libs/yup";

const likePostSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .mongodbId("Invalid id")
      .required()
      .label("Id"),
  }),
  body: yup.object({
    // like: yup.boolean().required().label("Like"),
  }),
});

export default likePostSchema;
