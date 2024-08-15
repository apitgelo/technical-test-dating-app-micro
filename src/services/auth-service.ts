import bcrypt from "bcryptjs";
import HttpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import HttpError from "../exceptions/http-error";
import {
  INVALID_CREDENTIALS,
  USER_EXISTS,
  USER_NOT_FOUND,
} from "../exceptions/messages";
import { UserInterface } from "../interfaces/user-interface";
import UserModel from "../models/user";
import {
  AuthLoginInput,
  AuthRegisterInput,
} from "../validators/auth-validator";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config";

const getUserByEmail = async (email: string): Promise<UserInterface | null> => {
  const user = await UserModel.findOne({ email });

  return user;
};

export const register = async (
  authRegisterInput: AuthRegisterInput,
): Promise<void> => {
  const userExists = await getUserByEmail(authRegisterInput.email);

  if (userExists) {
    throw new HttpError(
      USER_EXISTS(authRegisterInput.email),
      HttpStatus.CONFLICT,
    );
  }

  const hashedPassword = await bcrypt.hash(authRegisterInput.password, 10);
  await UserModel.create({
    email: authRegisterInput.email,
    password: hashedPassword,
    isPremium: false,
  });
};

export const login = async (
  authLoginInput: AuthLoginInput,
): Promise<{ accessToken: string; expiresIn: number }> => {
  const user = await getUserByEmail(authLoginInput.email);

  if (!user) {
    throw new HttpError(
      USER_NOT_FOUND(authLoginInput.email),
      HttpStatus.NOT_FOUND,
    );
  }

  const isPasswordValid = await bcrypt.compare(
    authLoginInput.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new HttpError(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
  }

  const userData = {
    userId: user.id,
    email: user.email,
  };
  const accessToken = jwt.sign(userData, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    accessToken,
    expiresIn: JWT_EXPIRES_IN,
  };
};
