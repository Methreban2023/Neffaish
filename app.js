const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const notFound = require("./middlewares/notFoundHandler");
const authRoutes = require("./api/auth/auth.routes");
const errorHandler = require("./middlewares/errorHandler");
const moviesRoutes = require("./api/movie/movies.routes");
const genreRoutes = require("./api/genre/genre.routes");
const celebRoutes = require("./api/celebrity/celeb.routes");
const connectDb = require("./database");
const passport = require("passport");
const config = require("./config/keys");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const path = require("path");

connectDb();

//declare var
const app = express();

//middlewares:
app.use(cors());
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(morgan("dev"));

//passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//routes

app.use("/users", authRoutes);
app.use("/api/genre", genreRoutes);
// app.use("/movies", movieRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/celebrities", celebRoutes);
//errorhandlers:
app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`The application is running on ${config.PORT}`);
});

module.exports = app;
