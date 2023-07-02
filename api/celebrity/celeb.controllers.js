const Celebrity = require("../../models/Celebrity");
const Movie = require("../../models/Movie");
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

exports.getCelebrity = async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find().populate("movies");
    res.status(200).json(celebrities);
  } catch (error) {
    next(error);
  }
};
exports.createCelebrity = async (req, res, next) => {
  try {
    // const { userInfo } = req.subuser;
    if (req.user.staff === true) {
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
exports.createCelebrityWithMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (movie) {
      if (req.user.staff === true) {
        req.body.createdBy = req.user._id;
        const newCelebrity = await Celebrity.create(req.body);

        // req.body.movies = movieId;

        await movie.updateOne({
          $push: { celebrity: newCelebrity._id },
        });

        await newCelebrity.updateOne({
          $push: { movies: movieId },
        });

        return await res.status(201).json({ newCelebrity });
      } else {
        res.status(401).json({
          message:
            "the user is not a staff member and not allowed to create celebrity!",
        });
      }
      next();
    }
  } catch (err) {
    next(err);
  }
};
