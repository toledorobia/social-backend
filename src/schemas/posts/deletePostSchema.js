import * as yup from "yup";

const deletePostSchema = yup.object({
  params: yup.object({
    id: yup.string().required().label("id"),
  }),
});

export default deletePostSchema;
