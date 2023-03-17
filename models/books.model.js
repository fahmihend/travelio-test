const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("books", formSchema);
