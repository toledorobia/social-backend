import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { v4 as uuidv4 } from "uuid";
import { mkdirSync } from "fs";
import sharp from "sharp";
import config from "../config";
import serviceAccount from "../../serviceAccountKey.json";
import { createFileName, createFirebaseStoreDownloadUrl } from './helpers';

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: config.firebaseBucket,
});

const bucket = getStorage().bucket();

export const processImage = (file, folder) => {
  // return Promise.resolve({file, folder});
  return new Promise((resolve, reject) => {
      mkdirSync(folder, { recursive: true });
      const filename = createFileName("webp");
      const path = `${folder}/${filename}`;
      const uuid = uuidv4();
      const { buffer } = file;

      sharp(buffer)
        .webp({ quality: 60 })
        .resize({
          width: 500,
          // height: 400,
          fit: sharp.fit.cover,
          // position: sharp.strategy.attention
        })
        .toFile(path)
        .then(() => bucket.upload(path))
        .then(() => bucket.file(filename))
        .then(file => file.setMetadata({
          metadata: {
            firebaseStorageDownloadTokens: uuid,
          }
        }))
        .then(() => Promise.resolve(createFirebaseStoreDownloadUrl(bucket.name, filename, uuid)))
        .then(url => resolve(url))
        .catch(err => reject(err));
  });
}