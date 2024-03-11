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

blogRouter.post("/", async (req, res, next) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save(blog);
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});


blogRouter.delete("/:id", async (req, res) => {
  try {
    const author = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json(author);
   } catch (err) {
    res.status(500).json({
     message: err.message,
    });
   }
})

module.exports = blogRouter;
