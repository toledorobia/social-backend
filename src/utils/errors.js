import _ from 'lodash';

export const httpError = (status = 404, message = "Not Found", errors = null) => {
  const err = new Error(message);
  err.status = status;

  if (!_.isNull(errors) && !_.isUndefined(errors)) {
    err.errors = errors;
  }

  return err;
}

export const clearYupPath = (path) => {
  return path.substring(path.indexOf(".") + 1);
};
