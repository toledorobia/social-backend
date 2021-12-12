import * as yup from "yup";

const createPostSchema = yup.object({
  body: yup.object({
    content: yup.string().required().label("Name"),
    image: yup.string().url().label("Image"),
  }),
});

export default createPostSchema;
