import * as yup from "yup";

const createPostSchema = yup.object({
  body: yup.object({
    content: yup.string().required().label("Content"),
  }),
});

export default createPostSchema;
