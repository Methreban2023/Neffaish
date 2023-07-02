const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getAllMovies,
  getOneMovie,
  //   updateMovie,
  //   deleteMovie,
  movieRating,
  celebrityAdd,
} = require("./movies.controllers");
const { param } = require("../../utils/params/param");

router.param("userId", param);

router.get("/", getAllMovies);
router.get("/:movieId", getOneMovie);
router.post(
  "/:movieId/:celebrityId",
  passport.authenticate("jwt", { session: false }),
  celebrityAdd
);
// router.patch(
//   "/:movieId",
//   passport.authenticate("jwt", { session: false }),
//   movieRating
// );
// router.put("/:movieId", updateMovie);
// router.delete("/:movieId", deleteMovie);

module.exports = router;
