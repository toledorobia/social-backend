import { config } from "dotenv";
config();

export default {
  mongodbURI: process.env.MONGODB_URI,
  tokenSecret: process.env.TOKEN_SECRET,
};
