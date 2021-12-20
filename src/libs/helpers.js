import _ from "lodash";
import path from "path";
import cryptoSHA256 from "crypto-js/sha256";
import { v4 as uuidv4 } from "uuid";

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
};

export const isSomething = (value) => {
  return !_.isUndefined(value) && !_.isNull(value);
};

export const sha256 = (str) => {
  return cryptoSHA256(str).toString();
};

export const generateUniqueId = (suffix = "") => {
  const id = sha256(new Date().getTime().toString() + uuidv4()).toString();
  return id + (isSomething(suffix) ? suffix : "");
};

export const createFileName = (ext = "") => {
  const name = sha256(new Date().getTime().toString() + uuidv4()).toString();
  return name.substring(0, 32) + (isSomething(ext) ? `.${ext}` : "");
};

export const createFirebaseStoreDownloadUrl = (bucket, pathFile, token) => {
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(pathFile)}?alt=media&token=${token}`;
}