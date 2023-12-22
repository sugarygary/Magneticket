const mongoose = require("mongoose");
const request = require("supertest");
const appServer = require("../server");
require("dotenv").config();
beforeEach(async () => {
  await mongoose.connect(process.env.ATLAS_URI, {
    dbName: "test_magneticket",
  });
  const login = await request(appServer).post("/api/auth/login-cineplex").send({
    email: "fwijaya918@gmail.com",
    password: "123",
  });
});

afterEach(async () => {
  await mongoose.connection.close();
});
afterAll(async () => {
  appServer.close();
});

describe("POST /api/cineplex/create-branch", () => {
  it("should create branch succesfully", async () => {
    const login = await request(appServer)
      .post("/api/cineplex/create-branch")
      .send({
        
        branch_name: "Grand Indonesia",
        address: "Jalan Peganggsaan Timur",
        city: "JAKARTA BARAT"
      });
    const logout = await request(appServer).get("/api/auth/logout");
    expect(login.statusCode).toBe(200);
  });
});
