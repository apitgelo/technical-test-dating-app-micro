import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectMongo from "../../src/database/connect";

const mongod = new MongoMemoryServer();

export const connect = async () => {
  await mongod.start();
  const uri = mongod.getUri();
  await connectMongo(mongoose, uri);
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  try {
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  } catch(e) {
    console.error(e);
  }
};
