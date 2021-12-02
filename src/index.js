import "core-js/stable";
import "regenerator-runtime/runtime";

import app from "./app";
import "./database";

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
