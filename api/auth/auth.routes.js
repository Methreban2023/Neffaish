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
router.param("staffId", async (req, res, next, userId) => {
  try {
    const foundUser = await fetchUser(userId, next);

    if (!foundUser)
      return next({ status: 404, message: "User not found for staff" });
    req.user = foundUser;
    req.params.staffId = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", passport.authenticate("jwt", { session: false }), getUser);
router.post("/createStaff", createStaff);
router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.put("/:userId", updateUser);
router.patch("/:staffId/:userId", updateAnyUser);
router.delete("/:userId", deleteUser);

module.exports = router;
