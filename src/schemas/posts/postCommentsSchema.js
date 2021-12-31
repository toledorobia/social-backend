import yup from "../../libs/yup";

const postCommentsSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .mongodbId("Invalid id")
      .required()
      .label("Id"),
  })
});

export default postCommentsSchema;
