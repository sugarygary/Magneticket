const mongoose = require("mongoose");
const request = require("supertest");
const appServer = require("../server");
require("dotenv").config();

afterAll(async () => {
  appServer.close();
});

describe("POST /api/auth/login-user", () => {
  it("should login as user succesfully", async () => {
    const logout = await request(appServer).get("/api/auth/logout");
    const login = await request(appServer).post("/api/auth/login-user").send({
      email: "fwijaya918@gmail.com",
      password: "felix",
    });
    expect(login.statusCode).toBe(200);
  });
});
describe("POST /api/auth/login-user", () => {
  it("should fail login as user with invalid password", async () => {
    const logout = await request(appServer).get("/api/auth/logout");
    const login = await request(appServer).post("/api/auth/login-user").send({
      email: "fwijaya918@gmail.com",
      password: "abc",
    });
    expect(login.statusCode).toBe(400);
  });
});
describe("POST /api/auth/login-user", () => {
  it("should fail login as user with invalid email", async () => {
    const logout = await request(appServer).get("/api/auth/logout");
    const login = await request(appServer).post("/api/auth/login-user").send({
      email: "fwijaya918123123@gmail.com",
      password: "abc",
    });
    expect(login.statusCode).toBe(400);
  });
});
describe("POST /api/auth/login-cineplex", () => {
  it("should login as cineplex succesfully", async () => {
    const logout = await request(appServer).get("/api/auth/logout");
    const login = await request(appServer)
      .post("/api/auth/login-cineplex")
      .send({
        email: "fwijaya918@gmail.com",
        password: "123",
      });
    expect(login.statusCode).toBe(200);
  });
});

describe("POST /api/auth/login-cineplex", () => {
  it("should fail login as cineplex, wrong password", async () => {
    const logout = await request(appServer).get("/api/auth/logout");
    const login = await request(appServer)
      .post("/api/auth/login-cineplex")
      .send({
        email: "fwijaya918@gmail.com",
        password: "12",
      });
    expect(login.statusCode).toBe(400);
  });
});
describe("POST /api/auth/login-cineplex", () => {
  it("should fail as cineplex, wrong email", async () => {
    const logout = await request(appServer).get("/api/auth/logout");
    const login = await request(appServer)
      .post("/api/auth/login-cineplex")
      .send({
        email: "fwijaya91@gmail.com",
        password: "123",
      });
    expect(login.statusCode).toBe(400);
  });
});

describe("POST /api/auth/login-promotor", () => {
  it("should login as promotor succesfully", async () => {
    const logout = await request(appServer).get("/api/auth/logout");
    const login = await request(appServer)
      .post("/api/auth/login-promotor")
      .send({
        email: "fwijaya918@gmail.com",
        password: "123",
      });
    expect(login.statusCode).toBe(200);
  });
});

describe("POST /api/auth/login-promotor", () => {
  it("should fail login as promotor, wrong password", async () => {
    const logout = await request(appServer).get("/api/auth/logout");
    const login = await request(appServer)
      .post("/api/auth/login-promotor")
      .send({
        email: "fwijaya918@gmail.com",
        password: "12",
      });
    expect(login.statusCode).toBe(401);
  });
});
describe("POST /api/auth/login-promotor", () => {
  it("should fail as promotor, wrong email", async () => {
    const logout = await request(appServer).get("/api/auth/logout");
    const login = await request(appServer)
      .post("/api/auth/login-promotor")
      .send({
        email: "fwijaya91@gmail.com",
        password: "123",
      });
    expect(login.statusCode).toBe(401);
  });
});
