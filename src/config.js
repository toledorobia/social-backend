import { config } from "dotenv";
config();

export default {
  env: process.env.APP_ENV,
  port: process.env.PORT || 8080,
  appUrl: process.env.APP_URL,
  sslCrtFile: process.env.SSL_CRT_FILE,
  sslKeyFile: process.env.SSL_KEY_FILE,

  mongodbURI: process.env.MONGODB_URI,
  tokenSecret: process.env.TOKEN_SECRET,

  mailService: process.env.MAIL_SERVICE,
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,

  firebaseBucket: process.env.FB_STORAGE_BUCKET,
  firebaseType: process.env.FB_TYPE,
  firebaseProjectId: process.env.FB_PROJECT_ID,
  firebasePrivateKeyId: process.env.FB_PRIVATE_KEY_ID,
  firebasePrivateKey: process.env.FB_PRIVATE_KEY,
  firebaseClientEmail: process.env.FB_CLIENT_EMAIL,
  firebaseClientId: process.env.FB_CLIENT_ID,
  firebaseAuthUri: process.env.FB_AUTH_URI,
  firebaseTokenUri: process.env.FB_TOKEN_URI,
  firebaseAuthProviderX509CertUrl: process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
  firebaseClientX509CertUrl: process.env.FB_CLIENT_X509_CERT_URL,
};
