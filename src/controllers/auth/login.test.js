const request = require("supertest");
const express = require("express");
const login = require("./login");

const app = express();

app.post("/users/login", login);
describe("test login controller", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  test("login return status 200 ", async () => {
    // const req = {
    //   body: {
    //     email: "example@gmail.com",
    //     password: "1111",
    //   },
    // };

    const response = await request(app).post("/users/login").send({
      email: "example@gmail.com",
      password: "1111",
    });
    expect(response.status).toBe(200);
  });
});
