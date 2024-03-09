const blogRouter = require('express').Router();

const Blog = require("../models/blogModel");

blogRouter.get("/", (req, res) => {
   // Blog.find({}).then(response => res.json(response))
   res.json("UAN")
})

module.exports = blogRouter;