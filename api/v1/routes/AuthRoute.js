const AuthRouter = require("express").Router();

const { login, emailSignup } = require("../controllers/AuthController");

AuthRouter.post("/signup", emailSignup);
AuthRouter.post("/login", login);

module.exports = {
  AuthRouter,
};
