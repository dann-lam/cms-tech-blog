//Dashboard apiRoute
//Allows users to see their own posts
//They get to edit their own posts
// I'll have to import the user information
// the user posts
const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("dashboard");
});

module.exports = router;
