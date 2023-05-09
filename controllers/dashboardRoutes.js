//Dashboard apiRoute
//Allows users to see their own posts
//They get to edit their own posts
// I'll have to import the user information
// the user posts
const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");
//If it passes our auth check, then we're logged in, no?
//Get posts.



module.exports = router;
