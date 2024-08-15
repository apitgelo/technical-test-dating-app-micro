import { Mongoose } from "mongoose";

export default async (mongoose: Mongoose, connectionUri: string) => {
  mongoose.connect(connectionUri)
    .then(() => {
      /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    })
    .catch(err => {
      console.log("MongoDB connection error. Please make sure MongoDB is running and mongodb env configuration is valid. " + err);
      process.exit();
    });
};
