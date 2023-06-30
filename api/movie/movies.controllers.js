const Movie = require("../../models/Movie");
const Celebrity = require("../../models/Celebrity");

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
    const { userInfo } = req.user;

    //to check if the user is a staff member:

    if (userInfo.staff === "true") {
      req.body.createdBy = userInfo._id;
      const newMovie = await Movie.create(req.body);
      return res.status(201).json({ newMovie });
    } else {
      console.log(
        "the user is not a staff member and not allowed to create movie!"
      );
      next();
    }
  } catch (err) {
    return next(err);
    // return res.status(500).json(err.message);
  }
};

exports.getCelebrity = async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find().populate("movies");
    return res.json(celebrities);
  } catch (error) {
    return next(error);
  }
};
exports.createCelebrity = async (req, res, next) => {
  try {
    const newCelebrity = await Celebrity.create(req.body);
    return res.status(201).json(newCelebrity);
  } catch (error) {
    next(error);
  }
};

exports.celebrityAdd = async (req, res, next) => {
  try {
    const { celebrityId } = req.params;
    const celebrity = await Celebrity.findById(celebrityId);
    await Movie.findByIdAndUpdate(req.celebrity._id, {
      $push: { celebrity: celebrity._id },
    });
    await Celebrity.findByIdAndUpdate(celebrityId, {
      $push: { movies: req.movie._id },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// getOneMovie, updateMovie, deleteMovie, createMovie;
