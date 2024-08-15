import request from "supertest";
import app from "../../src/app";
import { register } from "../../src/services/auth-service";
import { INVALID_CREDENTIALS, USER_NOT_FOUND } from "../../src/exceptions/messages";

describe("POST /auth/login AuthController loginUser", () => {
  it("should return 200 for successful user login", async () => {
    const registerInput = {
      email: "apitgelo@gmail.com",
      password: "password",
    };

    await register(registerInput);

    const loginInput = {
      data: registerInput,
    };
    const response = await request(app)
      .post("/auth/login")
      .send(loginInput);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("expiresIn");
  });

  it("should return 404 for user not found", async () => {
    const loginInput = {
      data: {
        email: "apitgelo@gmail.com",
        password: "password",
      },
    };

    const response = await request(app)
      .post("/auth/login")
      .send(loginInput);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      errors: {
        message: USER_NOT_FOUND(loginInput.data.email),
      },
    });
  });

  it("should return 404 for invalid credentials", async () => {
    const registerInput = {
      email: "apitgelo@gmail.com",
      password: "password",
    };

    await register(registerInput);

    const loginInput = {
      data: {
        email: registerInput.email,
        password: "invalid",
      },
    };
    const response = await request(app)
      .post("/auth/login")
      .send(loginInput);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      errors: {
        message: INVALID_CREDENTIALS,
      },
    });
  });

  it("should return 422 for invalid email", async () => {
    const loginInput = {
      data: {
        email: "invalid",
        password: "password",
      },
    };

    const response = await request(app)
      .post("/auth/login")
      .send(loginInput);

    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      errors: {
        message: "email must be an email",
      },
    });
  });

  it("should return 422 for missing email", async () => {
    const loginInput = {
      data: {
        password: "password",
      },
    };

    const response = await request(app)
      .post("/auth/login")
      .send(loginInput);

    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      errors: {
        message: "email should not be empty, email must be an email",
      },
    });
  });
});
