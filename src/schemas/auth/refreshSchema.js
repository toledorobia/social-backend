import * as yup from "yup";

const refreshSchema = yup.object({
  body: yup.object({
    refreshToken: yup.string().required().label("Refresh Token"),
  }),
});

export default refreshSchema;
