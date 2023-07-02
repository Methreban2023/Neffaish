const Movie = require("../../models/Movie");
const Celebrity = require("../../models/Celebrity");
// const User = require("../../models/User");

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find().populate("reviews celebrity createdBy"); //.populate("celebrity ratings reviews");
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

exports.getOneMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId).populate(
      "celebrity reviews createdBy"
    );
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

// exports.movieRating = async (req, res, next) => {
//   try {
//     const { movieId } = req.params;
//     if (req.user.staff == false) {
//       const movie = await Movie.findById(movieId);
//       if (movie) {
//         console.log(`${movie.title}`);
//         if (+req.body.rate >= 0 && +req.body.rate <= 10) {
//           const movieUserString = movie.ratings.user
//             ? movie.ratings.user.toString()
//             : "";
//           const requestUserString = req.user._id ? req.user._id.toString() : "";
//           //
//           Movie.find({ _id: movieId, "ratings.user": req.user._id })
//             .then((movies) => {
//               console.log(movies._id);
//               console.log(movies);
//             })

//           //

//           console.log(
//             `movie use = ${movieUserString}  and request user =${requestUserString}`
//           );
//           if (movieUserString === requestUserString) {
//             //if (movie.user.toString() === req.user._id.toString()) {
//             await movie.updateOne({
//               $set: {
//                 ratings: {
//                   rate: req.body.rate,
//                 },
//               },
//             });
//             return res.status(204).end();
//           } else if (movieUserString !== requestUserString) {
//             await movie.updateOne({
//               $push: {
//                 ratings: {
//                   user: req.user._id,
//                   rate: req.body.rate,
//                 },
//               },
//             });
//             return res.status(204).end();
//           } else {
//             return res
//               .status(500)
//               .json({ message: "ratings is not in range of 0-10" });
//           }
//         }
//       }
//     } else {
//       return res.status(500).json({
//         message: "the user is a staff! not allowed to add a movie rating!",
//       });
//     }
//   } catch (err) {
//     // res.status(500).json({ message: error.message });
//     next(err);
//   }
// };

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
