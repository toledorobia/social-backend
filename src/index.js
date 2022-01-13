import "core-js/stable";
import "regenerator-runtime/runtime";
import "./database";

import app from "./app";

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
