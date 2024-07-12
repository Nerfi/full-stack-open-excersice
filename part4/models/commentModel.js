const mongoose = require("mongoose");
const url = process.env.URL;

mongoose.connect(url);

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  // each comment can only relates to one blog,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  //el ejercicio no os pregunta por el autor, por eso no esta aqui
});
commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("Comment", commentSchema);
