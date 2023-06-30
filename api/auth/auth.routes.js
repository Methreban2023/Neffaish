const express = require("express");
const {
  getUser,
  createStaff,
  updateUser,
  deleteUser,
  fetchUser,
  signin,
  signup,
  updateAnyUser,
} = require("./auth.controllers");
const router = express.Router();
const passport = require("passport");
const { param } = require("../../utils/params/param");

router.param("userId", param);

router.get("/", passport.authenticate("jwt", { session: false }), getUser);
router.post("/createStaff", createStaff);
router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.put("/:userId", updateUser);
router.patch("/:userId", updateAnyUser);
router.delete("/:userId", deleteUser);

module.exports = router;
