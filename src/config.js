import { config } from "dotenv";
config();

console.log("MONGODB_URI", process.env.MONGODB_URI);

export default {
  mongodbURI: process.env.MONGODB_URI,
  tokenSecret: process.env.TOKEN_SECRET,
};
