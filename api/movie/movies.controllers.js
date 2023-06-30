const Movie = require("../../models/Movie");
const Celebrity = require("../../models/Celebrity");
const User = require("../../models/User");
// const { fetch } = require("../../utils/params/fetch");

// exports.fetchUser = async (userId, next) => {
//   try {
//     const user = await User.findById(userId);
//     return user;
//   } catch (err) {
//     return next(err);
//   }
// };

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
    //to check if the user is a staff member:
    if (req.user.staff === true) {
      req.body.createdBy = req.user._id;
      const newMovie = await Movie.create(req.body);
      return res.status(201).json({ newMovie });
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
    const { userInfo } = req.subuser;
    if (userInfo.staff === "true") {
      const newCelebrity = await Celebrity.create(req.body);
      return res.status(201).json(newCelebrity);
    } else {
      res.status(401).json({
        message:
          "the user is not a staff member and not allowed to create celebrity!",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.celebrityAdd = async (req, res, next) => {
  try {
    const { celebrityId } = req.params;
    const { movieId } = req.params;
    if (req.user.staff === true) {
      req.body.createdBy = req.user._id;

      const movie = await Movie.findById(movieId);
      const celebrity = await Celebrity.findById(celebrityId);

      if (movie && celebrity) {
        await movie.updateOne({
          $push: { celebrity: celebrityId },
        });

        await celebrity.updateOne({
          $push: { movies: movieId },
        });

        res.status(204).end();
      } else {
        res.status(404).json({ message: "Movie or Celeb not found" });
      }
    } else {
      res.status(401).json({
        message:
          "the user is not a staff member and not allowed to add celebrity to movie!",
      });
    }
  } catch (error) {
    next(error);
  }
};

// getOneMovie, updateMovie, deleteMovie, createMovie;
