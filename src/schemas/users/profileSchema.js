import yup from "../../libs/yup";

const profileSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .mongodbId("Invalid id")
      .required()
      .label("Id"),
  }),
});

export default profileSchema;
