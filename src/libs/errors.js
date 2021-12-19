import _ from "lodash";

class HttpException extends Error {
  constructor(
    status = 500,
    message = "Unknown error",
    errors = null,
    ...params
  ) {
    super(message, ...params);
    this.status = status;
    this.errors = errors;
  }
}

export { HttpException };

export const httpError = (
  status = 404,
  message = "Not Found",
  errors = null
) => {
  const err = new Error(message);
  err.status = status;

  if (!_.isNull(errors) && !_.isUndefined(errors)) {
    err.errors = errors;
  }

  return err;
};

export const clearYupPath = (path) => {
  return path.substring(path.indexOf(".") + 1);
};
