const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  //   getOneMovie,
  //   updateMovie,
  //   deleteMovie,
  //   createMovie,
} = require("./movies.controllers");

router.param("userId", async (req, res, next, userId) => {
  try {
    const foundUser = await fetchUser(userId, next);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.user = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getAllMovies);
// router.get("/:movieId", getOneMovie);
// router.post("/:userId", createMovie);

// router.put("/:movieId", updateMovie);
// router.delete("/:movieId", deleteMovie);

module.exports = router;
