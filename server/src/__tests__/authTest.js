const mongoose = require("mongoose");
const request = require("supertest");
const server = require("../server");
require("dotenv").config();
beforeEach(async () => {
  await mongoose.connect(process.env.ATLAS_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/login-user", () => {
  it("should login as user", async () => {
    const logout = await request(server).get("/api/auth/logout");
    const login = await request(server).post("/api/auth/login-user").send({
      email: "fwijaya918@gmail.com",
      password: "felix",
    });
    expect(login.statusCode).toBe(200);
  });
});
