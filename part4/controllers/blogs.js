const blogRouter = require("express").Router();
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
//testing
const blogList = require("../utils/list_helper");
//app.use("/api/blogs", blogRoutes); esta linea ki que hace es poner /api/blogs como prefijo de cualquiera
// de nuestras rutas
const tokenExtractorMiddleware = require("../utils/middleware");

blogRouter.get("/", async (req, res, next) => {
  try {
    const allBlogs = await Blog.find({}).populate("user", { username: 1 });
    if (allBlogs) {
      res.json(allBlogs);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", tokenExtractorMiddleware, async (req, res, next) => {
  //if not likes default to 0
  const { title, author, url, likes = 0 } = req.body;

  // const decodeToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  const decodeToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodeToken.id) {
    return res.status(401).send({ error: "token invalid" });
  }

  const user = await User.findById(decodeToken.id);

  try {
    if (!req.body.title || !req.body.url) {
      return res.status(400).end();
    }
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    });

    const savedBlog = await blog.save(blog);
    //updating users blogs

    user.blogs = user.blogs?.concat(savedBlog._id);
    await user.save();

    return res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", tokenExtractorMiddleware, async (req, res, next) => {
  //update just the likes of the app
  //finding the user 
  const decodeToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodeToken.id) {
    return res.status(401).send({ error: "token invalid" });
  }
  const user = await User.findById(decodeToken.id);
  try {

    const { likes } = req.body;
    const updatedBlogToSend = {
      //añadir ref al user once front-end is done
      ...req.body,
      likes: likes,
      user: user._id,
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

blogRouter.delete("/:id", tokenExtractorMiddleware, async (req, res) => {
  
  const decodeToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodeToken) {
    return res.status(401).send({ error: "Unauthorized to delete this" });
  }
  try {
    const singleblog = await Blog.findById(req.params.id);

    if (singleblog.user.toString() === decodeToken.id) {
      const author = await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json(author);
    }
    //else {
    //   res.status(401).send({
    //     error: "Unauthorized to delete this",
    //   });
    // }

    //const author = await Blog.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = blogRouter;
