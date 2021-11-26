require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const app = express();
const Article = require("./models/BlogPost.model");
const post = require("./routes/post");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use("/post", post);

// Connect to database

mongoose.connect("mongodb://localhost");
// home route

app.get("/", async (req, res) => {
  try {
    await Article.find({}).then((data) => {
      res.render("index", { result: data });
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
