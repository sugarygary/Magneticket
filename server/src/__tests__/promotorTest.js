const mongoose = require("mongoose");
const request = require("supertest");
const appServer = require("../server");
const path = require("path");
require("dotenv").config();
let cookie;
beforeEach(async () => {
  const login = await request(appServer).post("/api/auth/login-promotor").send({
    email: "fwijaya918@gmail.com",
    password: "123",
  });
  cookie = login.get("Set-Cookie");
});
afterEach(async () => {
  const logout = await request(appServer).get("/api/auth/logout");
});
afterAll(async () => {
  appServer.close();
});
describe("POST /api/promotor/create-event", () => {
  it("should create event succesfully", async () => {
    const createEvent = await request(appServer)
      .post("/api/promotor/create-event")
      .field("nama", "Ed Sheeran X Indonesia")
      .field("venue", "Jakarta International Stadium")
      .field("kota", "JAKARTA BARAT")
      .field("address", "Jalan Jalan Suka")
      .field("deskripsi", "Ed Sheeran Menyanyi Merdu")
      .field(
        "kategori",
        `[{"namaKategori":"VVIP","hargaTiket":500000,"slotTiket":200}]`
      )
      .field("tanggal", "2023/12/31")
      .attach("surat", path.resolve(__dirname, "./assets/unnamed.jpg"))
      .attach("banner", path.resolve(__dirname, "./assets/unnamed.jpg"))
      .attach("poster", path.resolve(__dirname, "./assets/unnamed.jpg"))
      .attach(
        "informasiKategori",
        path.resolve(__dirname, "./assets/unnamed.jpg")
      )
      .set("Cookie", cookie);
    expect(createEvent.statusCode).toBe(201);
  });
});
