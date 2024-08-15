import mongoose from "mongoose";
import app from "./app";
import { MONGODB_URI } from "./config";
import errorHandler from "errorhandler";
import connectMongo from "./database/connect";

(async () => {
  connectMongo(mongoose, MONGODB_URI);

  app.use(errorHandler());

  app.listen(app.get("port"), () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });
})();
