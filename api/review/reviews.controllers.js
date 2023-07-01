const Movie = require("../../models/Movie");
const Review = require("../../models/Review");
const User = require("../../models/User");

// exports.getUserReview = async (req, res, next) => {
//   try {
//     const { movieId } = req.params;

//     const review = await Review.find().populate("Movie User reviewText");
//     res.status(200).json(review);
//   } catch (error) {
//     next(error);
//   }
// };

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    //to check if the user is a registered:
    if (req.user === true) {
      const movie = await Movie.findById(movieId);
      if (movie) {
        // req.body.createdBy = req.user._id;
        req.body.movie = movie;
        req.body.usersReviews;
        const newReview = await Review.create(req.body);
        await movie.updateOne({
          $push: {
            movie: movieId,
            usersReviews: [
              {
                userId: req.user._id,
                reviewText: req.body.reviewText,
              },
            ],
          },
        });
        return res.status(201).json({ newReview });
      }
    } else {
      res.status(401).json({
        message: "you can not write a commint unless you are a member",
      });
    }
  } catch (err) {
    return next(err);
  }
};
