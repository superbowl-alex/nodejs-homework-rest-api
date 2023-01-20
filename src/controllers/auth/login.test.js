const request = require("supertest");
const mongoose = require("mongoose");
const login = require("./login");
const { User } = require("../../models/user");
const app = require("../../app");

require("dotenv").config();
const { DB_HOST, PORT } = process.env;

app.post("/api/users/login", login);
describe("test login controller", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login controller ", async () => {
    const newUser = {
      email: "test@gmail.com",
      password: "1111",
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "test@gmail.com",
      password: "1111",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    expect(response.status).toBe(200);
    const { body } = response;
    expect(body.token).toByTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
