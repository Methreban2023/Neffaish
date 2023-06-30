const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getAllMovies,
  //   getOneMovie,
  //   updateMovie,
  //   deleteMovie,
  createMovie,
  celebrityAdd,
} = require("./movies.controllers");
const { param } = require("../../utils/params/param");

router.param("userId", param);

router.get("/", getAllMovies);
// router.get("/:movieId", getOneMovie);

router.post("/", passport.authenticate("jwt", { session: false }), createMovie);

router.post(
  "/:movieId/:celebrityId",
  passport.authenticate("jwt", { session: false }),
  celebrityAdd
);
// router.put("/:movieId", updateMovie);
// router.delete("/:movieId", deleteMovie);

module.exports = router;
