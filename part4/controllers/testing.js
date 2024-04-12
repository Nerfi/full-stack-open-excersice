const testingRoutes = require("express").Router();
const Blog = require("../models/blogModel");
const User = require("../models/userModel");

testingRoutes.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

testingRoutes.get("/reset", async (req, res) => {
  res.status(200).send("yee")
});

module.exports = testingRoutes;
