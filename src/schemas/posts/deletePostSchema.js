import yup from "../../libs/yup";

const deletePostSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .mongodbId("Invalid id")
      .required()
      .label("Id"),
  }),
});

export default deletePostSchema;
