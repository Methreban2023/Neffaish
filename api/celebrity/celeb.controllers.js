const Celebrity = require("../../models/Celebrity");

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
    const { userInfo } = req.user;
    if (userInfo.staff === "true") {
      req.body.createdBy = userInfo._id;
      const newCelebrity = await Celebrity.create(req.body);
      return res.status(201).json({ newCelebrity });
    } else {
      console.log(
        "the user is not a staff member and not allowed to create movie!"
      );
      next();
    }
    next();
  } catch (err) {
    next(err);
  }
};
