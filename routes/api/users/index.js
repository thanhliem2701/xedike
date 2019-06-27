const express = require("express");
const userController = require("./user");
const { authenticating, authorizing } = require("../../../middlewares/auth");
const upload = require("../../../middlewares/uploadImage")

const router = express.Router();
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get(
  "/test-private",
  authenticating,
  authorizing(["driver", "passenger"]),
  userController.testPrivate
);
router.post(
  "/upload-avatar",
  authenticating,
  upload.single("avatar"),
  userController.uploadAvatar
  // (req, res, next) => {
  //   const { id } = req.user;
  //   User.findById(id)
  //     .then(user => {
  //       if (!user) return Promise.reject({ errors });

  //       user.avatar = req.file.path;
  //       return user.save();
  //     })
  //     .then(user => res.status(200).json(user))
  //     .catch(err => res.status(400).json(err));
  // }
);
module.exports = router;
