const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//view all post
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "post_title", "post_content", "created_at"],
    include: [
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
  })
    .then((postData) => {
      const postMulti = postData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { postMulti, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET post by id allows loggedin user to see the sepecific post content and direct to edit page
// router.get("/edit/:id", withAuth, (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "title", "content", "created_at"],
//     include: [
//       {
//         model: User,
//         attributes: ["username"],
//       },
//       {
//         model: Comment,
//         attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//     ],
//   })
//     .then((postData) => {
//       if (!postData) {
//         res.status(404).json({ message: "No post found with this id" });
//         return;
//       }
//       const post = postData.get({ plain: true });
//       res.render("edit-post", { post, loggedIn: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

//GET '/new' render add-post page when user want to add a new post
// router.get("/new", (req, res) => {
//   res.render("add-post");
// });

module.exports = router;
