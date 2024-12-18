const UserRouter = require("express").Router();

const {
  updateUser,
  userProfile,
  deleteUser,
  getAllUsers,
  getSalesDepartmentEmployees,
  getITDepartmentEmployees,
} = require("../controllers/UserController");

UserRouter.get("/", userProfile);
UserRouter.patch("/", updateUser);
UserRouter.delete("/", deleteUser);
UserRouter.get("/getAllUsers", getAllUsers);
UserRouter.get("/query", getITDepartmentEmployees);
UserRouter.get("/query2", getSalesDepartmentEmployees);
module.exports = {
  UserRouter,
};
