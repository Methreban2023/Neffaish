const Movie = require("../../models/Movie");
const Review = require("../../models/Review");
const User = require("../../models/User");

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

    if (req.user.staff === false) {
      const movie = await Movie.findById(movieId);
      if (movie) {
        req.body.movie = movieId;
        req.body.user = req.user._id;

        const newReview = await Review.create(req.body);

        await movie.updateOne({
          $push: {
            reviews: newReview._id,
          },
        });
        const foundUser = await User.findById(req.user._id);

        await foundUser.updateOne({
          $push: {
            reviews: newReview._id,
          },
        });
        return res.status(201).json({ newReview });
      }
    } else {
      res.status(401).json({
        message: "you can not write a comment unless you are a member",
      });
    }
  } catch (err) {
    return next(err);
  }
};
