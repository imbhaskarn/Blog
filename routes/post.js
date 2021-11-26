const express = require("express");
const router = express.Router();
const Article = require("../models/BlogPost.model");

router.get("/", (req, res) => {
  res.redirect("/");
});

//create a new post

router.get("/new", (req, res) => {
  res.render("new", { post: new Article() });
});

router.post("/new", (req, res) => {
  let post = new Article({
    title: req.body.title,
    author: req.body.author,
    post: req.body.post,
  });
  post.save((err, data) => {
    if (err) {
      res.render("posts", { post: post });
    } else {
      res.render("mypost", { result: data });
    }
  });
});

// Find article in database and update the article

router.get("/edit/:id", async (req, res) => {
  await Article.findById(req.params.id, (err, data) => {
    if (err) {
      res.send("error occured" + err);
    } else {
      res.render("edit", { post: data });
    }
  });
});

router.post("/edit/:id", async (req, res) => {
  try {
    await Article.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, author: req.body.author, post: req.body.post },
      { new: true }
    ).then((data) => {
      res.render("mypost", { result: data });
    });
  } catch (error) {
    console.log("Error found " + error);
  }
});

router.get("/view/:id", async (req, res) => {
  await Article.findById(req.params.id, (err, data) => {
    if (err) {
      res.send("error occured" + err);
    } else {
      res.render("mypost", { result: data });
    }
  });
});

module.exports = router;
