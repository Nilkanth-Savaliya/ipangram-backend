const DepartmentRouter = require("express").Router();

const {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
} = require("../controllers/DepartmentController");

DepartmentRouter.post("/", createDepartment);
DepartmentRouter.get("/", getDepartments);
DepartmentRouter.get("/:id", getDepartment);
DepartmentRouter.patch("/:id", updateDepartment);
DepartmentRouter.delete("/:id", deleteDepartment);

module.exports = {
  DepartmentRouter,
};
