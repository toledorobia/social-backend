import * as yup from "yup";

const updateProfileSchema = yup.object({
  body: yup.object({
    name: yup.string().required().label("Name"),
    avatar: yup.string().url().label("Avatar"),
  }),
});

export default updateProfileSchema;
