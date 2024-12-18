const UserRouter = require("express").Router();

const {
  updateUser,
  userProfile,
  deleteUser,
} = require("../controllers/UserController");

UserRouter.get("/", userProfile);
UserRouter.patch("/", updateUser);
UserRouter.delete("/", deleteUser);
module.exports = {
  UserRouter,
};
