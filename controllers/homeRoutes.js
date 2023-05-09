const router = require("express").Router();
const { User, Comment, Post } = require("../models");
const withAuth = require("../utils/auth"); //Do we need withAuth for this page? No. So remove it.

// Prevent non logged in users from viewing the homepage
router.get("/", async (req, res) => {
  try {
    //Instead of trying to grab our user data, change thyis to
    //grab our posts
    //send our posts to our res.render
    //So that our res.render handlebars can handle renderinglal of our posts.

    const postData = await Post.findAll({
      attributes: ["id", "post_title", "post_content", "created_at"],
      include:
      [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_content",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const postMulti = postData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      posts: postMulti,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      include: [
        {
          model: Post,
          include: {
            model: Comment,
          },
        },
        {
          model: Comment,
        },
      ],
      attributes: ["username"],
    });
    const user = userData.get({ plain: true });
    const posts = user.posts;
    const comments = user.comments;

    console.log("\n---- USER DATA ----\n\n", user);

    res.render("dashboard", {
      user: user,
      posts: posts,
      comments: comments,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
