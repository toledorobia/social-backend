import https from "https";
import fs from "fs";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./database";
import config from "./config";
import app from "./app";

if (config.env === "dev") {
  console.log("Certificates", config.sslCrtFile, config.sslKeyFile);


  const options = {
    key: fs.readFileSync(config.sslKeyFile),
    cert: fs.readFileSync(config.sslCrtFile),
  };

  https.createServer(options, app)
    .listen(app.get("port"), () => {
      console.log(`Server HTTPS on port ${config.port}`);
    });
}
else {
  app.listen(app.get("port"));
  console.log("Server on port", app.get("port"));
}


