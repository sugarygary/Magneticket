const mongoose = require("mongoose");
const request = require("supertest");
const appServer = require("../server");
require("dotenv").config();
const path = require("path");
let cookie;
beforeEach(async () => {
  const login = await request(appServer).post("/api/auth/login-cineplex").send({
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

describe("POST /api/cineplex/create-branch", () => {
  it("should create branch succesfully", async () => {
    const createBranch = await request(appServer)
      .post("/api/cineplex/create-branch")
      .send({
        branch_name: "Kaza Mall",
        address: "Jalan Peganggsaan Timur",
        city: "JAKARTA BARAT",
      })
      .set("Cookie", cookie);
    expect(createBranch.statusCode).toBe(201);
  });
});
describe("POST /api/cineplex/create-branch", () => {
  it("fail to create, duplicate branch name", async () => {
    const login = await request(appServer)
      .post("/api/auth/login-cineplex")
      .send({
        email: "fwijaya918@gmail.com",
        password: "123",
      });
    const cookie = login.get("Set-Cookie");
    const createBranch = await request(appServer)
      .post("/api/cineplex/create-branch")
      .send({
        branch_name: "Grand Indonesia",
        address: "Jalan Peganggsaan Timur",
        city: "JAKARTA BARAT",
      })
      .set("Cookie", cookie);
    const logout = await request(appServer).get("/api/auth/logout");
    expect(createBranch.statusCode).toBe(409);
  });
});

describe("POST /api/cineplex/create-promo", () => {
  it("should create promo succesfully", async () => {
    const createPromo = await request(appServer)
      .post("/api/cineplex/create-promo")
      .send({
        promo_code: "XMAS2023",
        valid_until: "2023-12-31",
        discount_amount: 20000,
        minimum_transaction: "",
      })
      .set("Cookie", cookie);
    expect(createPromo.statusCode).toBe(201);
  });
});

describe("POST /api/cineplex/studios/create-studio", () => {
  it("should create studio succesfully", async () => {
    const createStudio = await request(appServer)
      .post("/api/cineplex/studios/create-studio")
      .send({
        branch_id: "65865c47bf7eb549d7e04f05",
        studio_name: "Studio 10",
        type: "2D",
        row: 10,
        seating_layout: "4-8-4",
      })
      .set("Cookie", cookie);
    expect(createStudio.statusCode).toBe(201);
  });
});

describe("POST /api/cineplex/studios/create-studio", () => {
  it("should fail create studio, branch not found", async () => {
    const createStudio = await request(appServer)
      .post("/api/cineplex/studios/create-studio")
      .send({
        branch_id: "658665f2485ba5a275e29a9t",
        studio_name: "Studio 09",
        type: "2D",
        row: 10,
        seating_layout: "4-8-4",
      })
      .set("Cookie", cookie);
    expect(createStudio.statusCode).toBe(404);
  });
});

describe("POST /api/cineplex/studios/create-studio", () => {
  it("should fail create studio, invalid column input", async () => {
    const createStudio = await request(appServer)
      .post("/api/cineplex/studios/create-studio")
      .send({
        branch_id: "658665f2485ba5a275e29a8d",
        studio_name: "Studio 09",
        type: "2D",
        row: 10,
        seating_layout: "0",
      })
      .set("Cookie", cookie);
    expect(createStudio.statusCode).toBe(400);
  });
});

describe("POST /api/cineplex/create-screening", () => {
  it("should create screening succesfully", async () => {
    const createScreening = await request(appServer)
      .post("/api/cineplex/create-screening")
      .send({
        studio_id: "6586672f6c3b56bcf590e014",
        movie_id: "tt15789038",
        price: 40000,
        showtime: "2023-12-30T10:30:00.000Z",
      })
      .set("Cookie", cookie);
    expect(createScreening.statusCode).toBe(201);
  });
});

describe("POST /api/cineplex/create-screening", () => {
  it("should fail create screening, film not found", async () => {
    const createScreening = await request(appServer)
      .post("/api/cineplex/create-screening")
      .send({
        studio_id: "6586672f6c3b56bcf590e014",
        movie_id: "dd542424",
        price: 40000,
        showtime: "2023-12-30T10:30:00.000Z",
      })
      .set("Cookie", cookie);
    expect(createScreening.statusCode).toBe(404);
  });
});

describe("POST /api/cineplex/create-screening", () => {
  it("should fail create screening, date must be greater than 2 days from now", async () => {
    const createScreening = await request(appServer)
      .post("/api/cineplex/create-screening")
      .send({
        studio_id: "6586672f6c3b56bcf590e014",
        movie_id: "tt15789038",
        price: 40000,
        showtime: "2023-12-24T10:30:00.000Z",
      })
      .set("Cookie", cookie);
    expect(createScreening.statusCode).toBe(400);
  });
});

describe("GET /api/cineplex/screenings", () => {
  it("should get screening succesfully", async () => {
    const getScreening = await request(appServer)
      .get("/api/cineplex/screenings")
      .set("Cookie", cookie);
    expect(getScreening.statusCode).toBe(200);
  });
});

describe("POST /api/cineplex/create-menu", () => {
  it("should create menu succesfully", async () => {
    const createMenu = await request(appServer)
      .post("/api/cineplex/create-menu")
      .field("item_name", "Nasi Padang")
      .field("item_description", "Makanan khas Padang")
      .field("price", 30000)
      .attach("thumbnail", path.resolve(__dirname, "./assets/sao.jpg"))
      .set("Cookie", cookie);
    expect(createMenu.statusCode).toBe(201);
  });
});
