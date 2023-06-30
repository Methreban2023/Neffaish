const Genre = require("../../models/Genre");
const Movie = require("../../models/Movie");
const User = require("../../models/User");

exports.getAllGenres = async (req, res, next) => {
  try {
    const genre = await Genre.find();
    res.status(200).json(genre);
  } catch (error) {
    next(error);
  }
};

exports.createGenre = async (req, res, next) => {
  try {
    //to check if the user is a staff member:
    if (req.user.staff === true) {
      req.body.createdBy = req.user._id;
      const newGenre = await Genre.create(req.body);
      return res.status(201).json({ newGenre });
    } else {
      res.status(401).json({
        message:
          "the user is not a staff member and not allowed to create genre!",
      });
    }
    next();
  } catch (err) {
    return next(err);
    // return res.status(500).json(err.message);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const { genreId } = req.params;

    //to check if the user is a staff member:
    if (req.user.staff === true) {
      const genre = await Genre.findById(genreId);
      if (genre) {
        req.body.createdBy = req.user._id;
        const newMovie = await Movie.create({ ...req.body, genre: genreId });

        await genre.updateOne({
          $push: { movies: newMovie._id },
        });

        return res.status(201).json({ newMovie });
      }
    } else {
      res.status(401).json({
        message:
          "the user is not a staff member and not allowed to create movie!",
      });
    }
    next();
  } catch (err) {
    return next(err);
    // return res.status(500).json(err.message);
  }
};
