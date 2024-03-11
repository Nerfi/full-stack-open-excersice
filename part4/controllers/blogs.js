const blogRouter = require("express").Router();
const Blog = require("../models/blogModel");
//testing
const blogList = require("../utils/list_helper");
//app.use("/api/blogs", blogRoutes); esta linea ki que hace es poner /api/blogs como prefijo de cualquiera
// de nuestras rutas

blogRouter.get("/", async (req, res, next) => {
  try {
    const allBlogs = await Blog.find({});
    if (allBlogs) {
      res.json(allBlogs);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((blogCreated) => {
      res.status(201).json(blogCreated);
    })
    .catch((err) => console.log(err));
});

module.exports = blogRouter;
