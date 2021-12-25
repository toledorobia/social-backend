import * as yup from "yup";

const likePostSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid id")
      .required()
      .label("Id"),
  }),
  body: yup.object({
    like: yup.boolean().required().label("Like"),
  }),
});

export default likePostSchema;
