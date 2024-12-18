const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const { issueToken } = require("../services/jwtServices");
const {
  emailSignupValidation,
  loginValidation,
} = require("../services/validation");

const emailSignup = async (req, res) => {
  try {
    const { error } = emailSignupValidation(req.body);
    if (error)
      return res.status(422).json({ flag: false, message: error.message });

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user)
      return res.status(422).json({
        flag: false,
        message: `Account already exist with the same email!`,
      });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    req.body.password = hash;

    const userData = await new User(req.body).save();

    const token = issueToken({
      _id: userData._id,
      password: userData.password,
      loginType: "email",
    });

    delete userData.password;

    return res.status(200).json({
      flag: true,
      message: "Account created successfully",
      data: userData,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      flag: false,
      message: error?.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error)
      return res.status(422).json({ flag: false, message: error.message });

    const { email, password, deviceId } = req.body;

    const getUser = await User.findOne({ email });
    if (!getUser)
      return res.status(422).json({ message: "Invalid Credentials" });

    const check = await bcrypt.compare(password, getUser.password);
    if (!check) return res.status(422).json({ message: "Invalid Credentials" });

    const token = issueToken({
      _id: getUser._id,
      password: getUser.password,
      loginType: "email",
    });

    const userData = getUser.toObject();
    delete userData.password;

    return res.status(200).json({
      flag: true,
      data: userData,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      flag: false,
      message: error.message,
    });
  }
};

module.exports = {
  emailSignup,
  login,
};
