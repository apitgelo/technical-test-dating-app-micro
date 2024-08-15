import request from "supertest";
import app from "../../src/app";
import { register } from "../../src/services/auth-service";
import { USER_EXISTS } from "../../src/exceptions/messages";

describe("POST /auth/register AuthController registerUser", () => {
  it("should return 201 for successful user registration", async () => {
    const registerInput = {
      data: {
        email: "apitgelo@gmail.com",
        password: "password",
      },
    };

    const response = await request(app)
      .post("/auth/register")
      .send(registerInput);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      message: "User registered successfully",
    });
  });

  it("should return 409 for user already exists", async () => {
    const registerInput = {
      data: {
        email: "apitgelo@gmail.com",
        password: "password",
      },
    };

    await register(registerInput.data);

    const response = await request(app)
      .post("/auth/register")
      .send(registerInput);

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      errors: {
        message: USER_EXISTS(registerInput.data.email),
      }
    });
  });

  it("should return 422 for invalid email", async () => {
    const registerInput = {
      data: {
        email: "invalid",
        password: "password",
      },
    };

    const response = await request(app)
      .post("/auth/register")
      .send(registerInput);

    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      errors: {
        message: "email must be an email",
      }
    });
  });

  it("should return 422 for missing email", async () => {
    const registerInput = {
      data: {
        password: "password",
      },
    };

    const response = await request(app)
      .post("/auth/register")
      .send(registerInput);

    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      errors: {
        message: "email should not be empty, email must be an email",
      }
    });
  });
});
