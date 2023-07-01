const express = require("express");
const {
  getUser,
  createStaff,
  updateUser,
  deleteUser,
  signin,
  signup,
  updateAnyUser,
  getUserReviews,
} = require("./auth.controllers");
const router = express.Router();
const passport = require("passport");
const { param } = require("../../utils/params/param");
const uploader = require("../../middlewares/uploader");

router.param("userId", param);

router.get("/", passport.authenticate("jwt", { session: false }), getUser);
router.post("/createStaff", uploader.single("photo"), createStaff);
router.post("/signup", uploader.single("photo"), signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.put("/:userId", updateUser);
router.patch("/:userId", updateAnyUser);
router.delete("/:userId", deleteUser);
router.get("/userReviews", getUserReviews);

module.exports = router;
