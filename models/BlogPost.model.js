const mongoose = require("mongoose");
// const Schema = mongoose.Schema();

const BlogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
  author: { type: String, required: true },
  post: { type: String, required: true },
});

module.exports = mongoose.model('Post', BlogSchema, 'posts')
