const router = require("express").Router();
const { User } = require("../../models");

//Route for logging in.
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((userData) => {
      if (!userData) {
        res.status(400).json({ message: "No user with that username!" });
        return;
      }
      const validPassword = userData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.name = userData.name;
        req.session.logged_in = true;

        res.json({ user: userData, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    //destroy session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//Route for new users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })

    .then((userData) => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;

        res.json(userData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
