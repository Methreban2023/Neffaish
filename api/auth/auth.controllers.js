const User = require("../../models/User");
const Review = require("../../models/Review");
const passHash = require("../../utils/auth/passhash");
const generateToken = require("../../utils/auth/generateToken");

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find(); //.select("-__v");
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

exports.createStaff = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = await passHash(password, next);
    req.body.staff = "true";
    const newUser = await User.create(req.body);

    const token = generateToken(newUser, next);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
    // return res.status(500).json(err.message);
  }
};

exports.signup = async (req, res, next) => {
  try {
    //encrypt the password
    const { password } = req.body;
    req.body.password = await passHash(password, next);
    //assign false to staff to diffrentiate between staff and normal users
    req.body.staff = "false";
    //create user with encrypted password
    if (req.file) {
      req.body.photo = req.file.path.replace("\\", "/");
    }
    const newUser = await User.create(req.body);
    //create token
    const token = generateToken(newUser, next);

    return res.status(201).json({ token });
  } catch (err) {
    //  res.status(500).json("Server Error");
    return next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user, next);
    return res.status(200).json({ token });
  } catch (err) {
    // return res.status(500).json(err.message);
    return next(err);
  }
};

exports.updateAnyUser = async (req, res, next) => {
  try {
    const { staff } = req.params.staffId;
    console.log(req.params.staffId);
    // console.log(`${staff.username} ${staff.staff}`);
    await User.findByIdAndUpdate(req.user.id, req.body);
    // if (userInfo.staff === "true"){

    // }
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.user._id);
    if (userInfo) {
      if (userInfo.staff === true)
        await User.findByIdAndUpdate(req.user.id, req.body);
      else {
        // await User.updateOne;

        if (foundPost) {
          await foundPost.updateOne(req.body);
          res.status(204).end();
        } else {
          res.status(404).json({ message: "post not found" });
        }
      }
    }
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndRemove({ _id: req.user.id });
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

exports.getUserReviews = async (req, res, next) => {
  try {
    // const { movieId } = req.params;
    const { userId } = req.user;
    const review = await Review.find({ "users.userId": userId }).populate(
      "User "
    );
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};
