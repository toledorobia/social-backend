import _ from "lodash";
import path from "path";

export const sanitizeFilename = (filename) => {
  let name = filename.replace(/[^a-zA-Z0-9-_\.]/g, "_").trim();
  return _.snakeCase(name);
};

export const makeFilename = (filename, unique = true) => {
  const pathData = path.parse(filename);

  let hash = "";
  if (unique === true) {
    hash = "_" + Date.now();
  }

  return sanitizeFilename(pathData.name) + hash + pathData.ext;
};

export const valueOrDefault = (value, _default) => {
  if (_.isUndefined(value) || _.isNull(value)) {
    return _default;
  }

  return value;
}

export const isSomething = (value) => {
  return !_.isUndefined(value) && !_.isNull(value);
}