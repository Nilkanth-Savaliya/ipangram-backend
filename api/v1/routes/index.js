const v1Router = require("express").Router();

const { userVerifyToken } = require("../services/jwtServices");
const { AuthRouter } = require("./AuthRoute");
const { UserRouter } = require("./UserRoute");
const { DepartmentRouter } = require("./DepartmentRoute");

v1Router.use("/auth", AuthRouter);
v1Router.use("/user", userVerifyToken, UserRouter);
v1Router.use("/department", userVerifyToken, DepartmentRouter);

module.exports = { v1Router };
