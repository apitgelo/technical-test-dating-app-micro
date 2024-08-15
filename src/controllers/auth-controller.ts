import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import { login, register } from "../services/auth-service";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { data } = req.body;

  try {
    await register(data);
    res.status(HttpStatus.CREATED).send({
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { data } = req.body;

  try {
    const token = await login(data);
    res.status(HttpStatus.OK).send(token);
  } catch (error) {
    next(error);
  }
}
