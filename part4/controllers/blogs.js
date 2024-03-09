const blogRouter = require("express").Router();
const Blog = require("../models/blogModel");
//app.use("/api/blogs", blogRoutes); esta linea ki que hace es poner /api/blogs como prefijo de cualquiera
// de nuestras rutas

blogRouter.get("/", (req, res) => {
  Blog.find({})
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
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
