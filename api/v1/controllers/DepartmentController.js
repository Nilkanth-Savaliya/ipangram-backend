const { Department } = require("../models/Department");
const { User } = require("../models/User");
const { departmentValidation } = require("../services/validation");
const _ = require("lodash");

const createDepartment = async (req, res) => {
  try {
    const { error } = departmentValidation(req.body);
    if (error)
      return res.status(422).json({ flag: false, message: error.message });

    const data = req.body;

    const department = await new Department(data).save();

    return res.status(200).json({
      flag: true,
      data: department,
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error?.message,
    });
  }
};

const getDepartments = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const departments = await Department.paginate({}, { page, limit });

    return res.status(200).json({
      flag: true,
      data: departments,
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error?.message,
    });
  }
};

const getDepartment = async (req, res) => {
  try {
    const department = await Department.findOne({ _id: req.params.id });

    return res.status(200).json({
      flag: true,
      data: department,
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error?.message,
    });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { error } = departmentValidation(req.body);
    if (error)
      return res.status(422).json({ flag: false, message: error.message });

    const data = req.body;

    const updated = await Department.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    );

    return res.status(200).json({
      flag: true,
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error?.message,
    });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const resp = await Department.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      flag: true,
      data: resp.deletedCount
        ? "Department deleted successfully!"
        : "Department not found",
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error?.message,
    });
  }
};

module.exports = {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
};
