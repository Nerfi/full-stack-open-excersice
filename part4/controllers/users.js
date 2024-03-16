const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/userModel");

usersRouter.post("/", async (req, res, next) => {
  //signup end-point
  const { username, name, password } = req.body;

  if(password.length < 3) {
    res.status(400).send({
      error: "password must be at least 3"
    })
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
        error: error.message 
      })
    next(error);
  }
});

usersRouter.get("/", async(req, res) => {
    const users =await User.find({});
    res.json(users);
})

module.exports = usersRouter;
