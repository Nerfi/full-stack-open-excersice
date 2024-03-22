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


/* USER TEST SOLUTION 
const supertest = require('supertest')
const mongoose = require('mongoose')
const { test, describe, after, beforeEach } = require('node:test')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const assert = require('assert')

const User = require('../models/user')

describe('users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('a valid user can be added', async () => {
    const newUser = {
      username: "newuser",
      name: "New User",
      password: "password"
    }

    const usersAtStart = await helper.usersInDb()

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    assert.strictEqual(response.body.username, newUser.username)
    assert.strictEqual(response.body.name, newUser.name)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })

  test('user without username is not added', async () => {
    const newUser = {
      name: "New User",
      password: "password"
    }

    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('user without password is not added', async () => {
    const newUser = {
      username: "newuser",
      name: "New User"
    }

    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(result.body.error, 'password missing or too short')
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test.only('same username can not be addwd twice' , async () => {
    const newUser = {
      username: "newuser",
      name: "New User",
      password: "password"
    }
  
    await api
      .post('/api/users')
      .send(newUser)
  
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  
    const usersAtEnd = await helper.usersInDb()
  
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  after(() => {
    mongoose.connection.close()
  })
})
*/