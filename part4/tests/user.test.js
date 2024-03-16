const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation suceeds with a fresh username", async () => {
    const usersAtStart = await User.find({});
    const returnedUsers = usersAtStart.map((u) => u.toJSON());

    const newUser = {
      username: "juan",
      password: "1234Juanako",
      name: "juan",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("can not create invalid user", async () => {
    
    const invalidUser = {
      username: "j",
      password: "12",
    };

    await api.post("/api/users")
    .send(invalidUser)
    .expect(400)
    

  });

});

afterAll(() => {
  mongoose.connection.close();
});
