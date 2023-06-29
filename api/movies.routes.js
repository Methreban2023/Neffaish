const express = require("express");
const router = express.Router();

router.get("/", getAllMovies);

module.exports = router;
