const mongoose = require("mongoose");
const request = require("supertest");
const server = require("../server");
require("dotenv").config();
beforeEach(async () => {
  await mongoose.connect(process.env.ATLAS_URI, {
    dbName: "test_magneticket",
  });
  const login = await request(server).post("/api/auth/login-cineplex").send({
    email: "fwijaya918@gmail.com",
    password: "123",
  });
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/cineplex/create-branch", () => {
    it("should create branch succesfully", async () => {
      
      const login = await request(server).post("/api/auth/login-promotor").send({
        email: "fwijaya918@gmail.com",
        password: "123",
      });
      const logout = await request(server).get("/api/auth/logout");
      expect(login.statusCode).toBe(200);
    });
  });
