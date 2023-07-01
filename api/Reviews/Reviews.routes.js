const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getOneReview,
  getAllReviews,
  createReview,
} = require("./Review.controllers");

const { param } = require("../../utils/params/param");

router.param("userId", param);

router.get("/", getAllReviews);
router.get("/", getOneReview);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createReview
);

module.exports = router;
