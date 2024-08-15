import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import rateLimiter from "./middlewares/rate-limiter";
import Router from "./routes";
import ErrorHandler, { NotFoundHandler } from "./exceptions/handler";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.raw({ type: "application/vnd.api+json" }));
app.use(bodyParser.text({ type: "text/html" }));

app.use(rateLimiter);

Router.configure(app);

app.use(NotFoundHandler);
app.use(ErrorHandler);

export default app;
