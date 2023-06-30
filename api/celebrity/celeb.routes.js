const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getCelebrity, createCelebrity } = require("./celeb.controllers");
const { param } = require("../../utils/params/param");

router.param("userId", param);

//celebrity routers
router.get("/", getCelebrity);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCelebrity
);

module.exports = router;
