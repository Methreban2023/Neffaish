const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getAllGenres,
  createMovie,
  createGenre,
} = require("./genre.controllers");
const { param } = require("../../utils/params/param");

router.param("userId", param);

router.get("/", getAllGenres);

router.post(
  "/:genreId",
  passport.authenticate("jwt", { session: false }),
  createMovie
);

router.post("/", passport.authenticate("jwt", { session: false }), createGenre);

module.exports = router;
