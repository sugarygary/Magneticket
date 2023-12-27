// const mongoose = require("mongoose");
// const request = require("supertest");
// const appServer = require("../server");
// require("dotenv").config();

// afterAll(async () => {
//   appServer.close();
// });

// describe("POST /api/user/create-snap", () => {
//   it("should screening not found", async () => {
//     const login = await request(appServer)
//       .post("/api/auth/login-user")
//       .send({
//         email: "fwijaya918@gmail.com",
//         password: "felix",
//       });
//     const cookie = login.get("Set-Cookie");
//     const snap = await request(appServer).post("/api/user/create-snap").send({
//         foods: [],
//         seats: ["6586672f6c3b56bcf590e016"],
//         screening_id: "1234qwer",
//         discount_amount: 0,
//     }).set("Cookie", cookie);
//     const logout = await request(appServer).get("/api/auth/logout");
//     expect(snap.statusCode).toBe(404);
//   });
// });

// describe("POST /api/user/create-transaction", () => {
//   it("should screening not found", async () => {
//     const login = await request(appServer)
//       .post("/api/auth/login-user")
//       .send({
//         email: "fwijaya918@gmail.com",
//         password: "felix",
//       });
//     const cookie = login.get("Set-Cookie");
//     const snap = await request(appServer).post("/api/user/create-snap").send({
//         foods: [],
//         seats: ["6586672f6c3b56bcf590e016"],
//         screening_id: "6586699e3b3a84c7acfa45bb",
//         discount_amount: 0,
//     })
//     const createTicket = await request(appServer)
//       .post("/api/user/create-transaction")
//       .send({
//         foods: [],
//         seats: ["6586672f6c3b56bcf590e016"],
//         screening_id: "1234qwer",
//         discount_amount: 0,
//         order_id: snap.order_id,
//         status: "pending",
//         midtrans_token: snap.token,
//         promo_code: "",
//       })
//       .set("Cookie", cookie);
//     const logout = await request(appServer).get("/api/auth/logout");
//     expect(createTicket.statusCode).toBe(404);
//   });
// });
