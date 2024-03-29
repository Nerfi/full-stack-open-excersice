require("dotenv").config();
//hemos añadido la linea de arriba debido a este error
// MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.
const mongoose = require("mongoose");
const url = process.env.URL;

mongoose.connect(url);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, "name must be at least 3"]
  },
  password: {
    type: String,
    //required: true,
    minLength: 3
    
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash
  },
});

module.exports = mongoose.model("User", userSchema);
