const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

usersRouter.post("/", async (req, res, next) => {
  //signup end-point
  const { username, name, password } = req.body;

  if (password.length < 3) {
    res.status(400).send({
      error: "password must be at least 3",
    });
    return;
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      passwordHash,
      name,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  //LOGIN METHHOD
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  res.json(users);
});

//find single user

usersRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("blogs");
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({
      error: error.message,
    });
    next(error);
  }
});

module.exports = usersRouter;
