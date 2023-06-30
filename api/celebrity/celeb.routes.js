const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getCelebrity, createCelebrity } = require("./celeb.controllers");

//celebrity routers
router.get(
  "/celebrity/:userId",
  passport.authenticate("jwt", { session: false }),
  getCelebrity
);

router.post(
  "/celebrity/:userId",
  passport.authenticate("jwt", { session: false }),
  createCelebrity
);

module.exports = router;
