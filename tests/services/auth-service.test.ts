import { login, register } from "../../src/services/auth-service";
import UserModel from "../../src/models/user";
import { USER_EXISTS, USER_NOT_FOUND } from "../../src/exceptions/messages";

describe("AuthService register", () => {
  it("should successfully register a user", async () => {
    const registerInput = {
      email: "apitgelo@gmail.com",
      password: "password",
    };

    await register(registerInput);

    const users = await UserModel.find();
    const registeredUser = await UserModel.findOne({ email: registerInput.email });

    expect(users).toHaveLength(1);
    expect(registeredUser?.email).toBe(registerInput.email);
  });

  it("should throw an error if user already exists", async () => {
    const registerInput = {
      email: "apitgelo@gmail.com",
      password: "password",
    };

    await register(registerInput);

    try {
      await register(registerInput);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((error as any).message).toBe(USER_EXISTS(registerInput.email));
    }

    const users = await UserModel.find();
    expect(users).toHaveLength(1);
  });
});

describe("AuthService login", () => {
  it("should successfully login a user", async () => {
    const registerInput = {
      email: "apitgelo@gmail.com",
      password: "password",
    };

    await register(registerInput);
    const users = await UserModel.find();

    const loginInput = {
      email: registerInput.email,
      password: registerInput.password,
    };

    const response = await login(loginInput);

    expect(users).toHaveLength(1);
    expect(response).toHaveProperty("accessToken");
    expect(response).toHaveProperty("expiresIn");
  });

  it("should throw an error if user not found", async () => {
    const loginInput = {
      email: "apitgelo@gmail.com",
      password: "password",
    };

    try {
      await login(loginInput);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((error as any).message).toBe(USER_NOT_FOUND(loginInput.email));
    }

    const users = await UserModel.find();
    expect(users).toHaveLength(0);
  });

  it("should throw an error if invalid credentials", async () => {
    const registerInput = {
      email: "apitgelo@gmail.com",
      password: "password",
    };

    await register(registerInput);

    const loginInput = {
      email: registerInput.email,
      password: "invalid",
    };

    try {
      await login(loginInput);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((error as any).message).toBe("Invalid credentials");
    }

    const users = await UserModel.find();
    expect(users).toHaveLength(1);
  });
});
