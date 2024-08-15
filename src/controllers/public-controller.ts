import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";

export const getHome = (_: Request, res: Response) => {
  res.json({
    msg: "Your micro service name",
    version: process.env.npm_package_version
  });
};

export const getHealth = (_: Request, res: Response) => {
  const somethingWrong = mongoose.connection.readyState != 1;

  if (somethingWrong) {
    res.status(HttpStatus.SERVICE_UNAVAILABLE);
    return res.json({
      status: "Unavailable",
      dbStatus: mongoose.STATES[mongoose.connection.readyState]
    });
  }

  res.status(HttpStatus.OK);
  res.json({
    status: "OK",
    dbStatus: mongoose.STATES[mongoose.connection.readyState]
  });
};

export const getPing = (_: Request, res: Response) => {
  res.status(HttpStatus.OK).send("PONG");
};
