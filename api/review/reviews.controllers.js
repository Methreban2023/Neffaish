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
    //to check if the user is a registered:
    if (req.user === true) {
      req.body.createdBy = req.user._id;
      const newReview = await Review.create(req.body);
      return res.status(201).json({ newReview });
    } else {
      res.status(401).json({
        message: "you can not write a commint unless you are a member",
      });
    }
  } catch (err) {
    return next(err);
  }
};
