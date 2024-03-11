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
  //if not likes default to 0
  const { title, author, url, likes = 0 } = req.body;
  try {
    if (!req.body.title || !req.body.url) {
      res.status(400).end();
    }
    const blog = new Blog({ title, author, url, likes });

    const savedBlog = await blog.save(blog);

    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});


blogRouter.put("/:id", async (req, res, next) => {
  //update just the likes of the app
  try {
    const { likes } = req.body;
    const updatedBlogToSend = {
      ...req.body,
      likes: likes,
    };
    //update
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedBlogToSend,
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});


blogRouter.get("/:id", async (req, res, next) => {
  try {
    const idToSearch = req.params.id;
    const singleBlog = await Blog.findById(idToSearch);
    if (!singleBlog) {
      res.status(400).end();
    }
    res.json(singleBlog);
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
