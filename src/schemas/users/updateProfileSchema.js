import * as yup from "yup";

const updateProfileSchema = yup.object({
  body: yup.object({
    name: yup.string().label("Name"),
  }),
});

export default updateProfileSchema;
