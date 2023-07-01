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

exports.getCelebrity = async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.status(200).json(celebrities);
  } catch (error) {
    next(error);
  }
};

exports.createCelebrity = async (req, res, next) => {
  try {
    if (req.user.staff === true) {
      req.body.createdBy = req.user._id;
      const newCelebrity = await Celebrity.create(req.body);
      return res.status(201).json({ newCelebrity });
    } else {
      res.status(401).json({
        message:
          "the user is not a staff member and not allowed to create celebrity!",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
