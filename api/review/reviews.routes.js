const express = require("express");
const router = express.Router();
const passport = require("passport");
const { param } = require("../../utils/params/param");
const { getAllReviews, createReview } = require("./reviews.controllers");

router.param("userId", param);

router.get("/", getAllReviews);

router.post(
  "/:movieId",
  passport.authenticate("jwt", { session: false }),
  createReview
);

module.exports = router;
