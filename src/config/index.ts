import dotenv from 'dotenv';

dotenv.config();

export const APP_DEBUG = Boolean(
  JSON.parse(String(process.env.APP_DEBUG).toLowerCase())
);

const MONGODB_URI_SCHEME = process.env["MONGODB_URI_SCHEME"]
  ? process.env["MONGODB_URI_SCHEME"]
  : "mongodb";
const MONGODB_USER = process.env["MONGODB_USER"];
const MONGODB_PASSWORD = process.env["MONGODB_PASSWORD"];
const MONGODB_HOST = process.env["MONGODB_HOST"];
const MONGODB_PORT = process.env["MONGODB_PORT"];
const MONGODB_DATABASE = process.env["MONGODB_DATABASE"];
let mongoUri = `${MONGODB_URI_SCHEME}://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

if (MONGODB_USER) {
  mongoUri = `${MONGODB_URI_SCHEME}://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;
}

export const MONGODB_URI = mongoUri;

export const JWT_SECRET = process.env["JWT_SECRET"] || "jwtsecret";
export const JWT_EXPIRES_IN = parseInt(process.env["JWT_EXPIRES_IN"] || "3600");
