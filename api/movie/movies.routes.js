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

router.param("userId", async (req, res, next, userId) => {
  try {
    const foundUser = await fetchUser(userId, next);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.subuser = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/movie", getAllMovies);
// router.get("/:movieId", getOneMovie);

router.post(
  "/movie/:userId",
  passport.authenticate("jwt", { session: false }),
  createMovie
);

router.post(
  "/:movieId/:celebrityId/:userId",
  passport.authenticate("jwt", { session: false }),
  celebrityAdd
);
// router.put("/:movieId", updateMovie);
// router.delete("/:movieId", deleteMovie);

module.exports = router;
