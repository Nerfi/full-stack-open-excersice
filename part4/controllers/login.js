const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/userModel");

loginRouter.post("/", async (req, res) => {
    //LOGIN LOGIC
  const { username, password } = req.body;

  //encontramos al usuario en la bbdd en base al username
  const user = await User.findOne({ username });
  //para el usuario que hemos encontrado, chequeamos la contraseña, chequeamos la contraseña que nos viene
  //user.password con la passwrord que nos han enviado por solicitud
  const passwordCorrect =
    password === null ? false : await bcrypt.compare(password, user.password);
  // si no tenemos usuario o la contraseña esta mal , 401 error back
  if (!(user && passwordCorrect)) {
    res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({
    token,
    username: user.username,
    name: user.username,
  });
});


module.exports = loginRouter;