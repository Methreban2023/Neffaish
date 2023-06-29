const User = require("../../models/User");
const passHash = require("../../utils/auth/passhash");
const generateToken = require("../../utils/auth/generateToken");

exports.fetchUser = async (userId, next) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find().select("-__v");
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

exports.createStaff = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = await passHash(password);
    req.body.staff = "true";
    const newUser = await User.create(req.body);

    const token = generateToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.signup = async (req, res) => {
  try {
    //encrypt the password
    const { password } = req.body;
    req.body.password = await passHash(password);
    //assign false to staff to diffrentiate between staff and normal users
    req.body.staff = "false";
    //create user with encrypted password

    const newUser = await User.create(req.body);
    console.log(`exports.signup -> hashedPassword`, req.body.password);
    //create token
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.signin = async (req, res) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndRemove({ _id: req.user.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
