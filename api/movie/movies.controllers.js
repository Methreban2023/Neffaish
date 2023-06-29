const Movie = require("../../models/Movie");

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const newMovie = await Movie.create(req.body);

    return res.status(201).json({ newMovie });
  } catch (err) {
    return next(err);
    // return res.status(500).json(err.message);
  }
};

// getOneMovie, updateMovie, deleteMovie, createMovie;
