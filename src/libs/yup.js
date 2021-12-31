import * as yup from 'yup';

yup.addMethod(yup.string, "mongodbId", function (errorMessage) {
  return this.test(`test-mongodb-id`, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      /^[0-9a-fA-F]{24}$/.test(value) ||
      createError({ path, message: errorMessage })
    );
  });
});


export default yup;