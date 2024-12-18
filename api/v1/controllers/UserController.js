const { User } = require("../models/User");
const { Department } = require("../models/Department");
const { userUpdateValidation } = require("../services/validation");
const _ = require("lodash");

const userProfile = async (req, res) => {
  try {
    const user = req.user;
    const userData = await User.findOne({ _id: user._id }).select("-password");
    console.log("calling", userData);

    return res.status(200).json({
      flag: true,
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error?.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { error } = userUpdateValidation(req.body);
    if (error)
      return res.status(422).json({ flag: false, message: error.message });

    const user = req.user;
    const data = req.body;

    const updated = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: data },
      { new: true }
    ).select(`-password`);

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

const deleteUser = async (req, res) => {
  try {
    const user = req.user;

    const resp = await User.deleteOne({ _id: user._id });

    return res.status(200).json({
      flag: true,
      data: resp.deletedCount ? "User deleted successfully!" : "User not found",
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error?.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ type: "user" }).select("-password");

    return res.status(200).json({
      flag: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      flag: false,
      message: error?.message,
    });
  }
};

const getITDepartmentEmployees = async (req, res) => {
  const departments = await Department.find({
    category_name: "IT",
    location: { $regex: "^A", $options: "i" },
  }).populate("employee_ids");
  console.log(departments);
  const users = departments.flatMap((dept) => dept.employee_ids);
  return res.status(200).json({
    flag: true,
    data: users,
  });
};

const getSalesDepartmentEmployees = async (req, res) => {
  const departments = await Department.find({
    category_name: "sales",
  }).populate({
    path: "employee_ids",
    options: { sort: { first_name: -1 } }, // Sort employees by first_name in descending order
  });
  console.log(departments);
  const users = departments.flatMap((dept) => dept.employee_ids); // Flatten employee lists from multiple departments if needed
  return res.status(200).json({
    flag: true,
    data: users,
  });
};

module.exports = {
  userProfile,
  updateUser,
  deleteUser,
  getAllUsers,
  getITDepartmentEmployees,
  getSalesDepartmentEmployees,
};
