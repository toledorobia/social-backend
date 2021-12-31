import mongoose from "mongoose";
import config from "./config";

(async () => {
  try {
    const db = await mongoose.connect(config.mongodbURI);
    console.log("Connected dabatase", db.connection.name);
  } catch (error) {
    console.log("Error connecting database", error);
  }
})();
