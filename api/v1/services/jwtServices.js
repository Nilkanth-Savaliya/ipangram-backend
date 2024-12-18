const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const issueToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return token;
};

const verifyToken = async (req, res, next) => {
  try {
    if (req?.headers?.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const userData = jwt.verify(token, process.env.JWT_SECRET);
      if (!userData)
        return res
          .status(401)
          .json({ flag: false, message: "Unauthorized request" });

      const isUserExist = await User.findById(userData._id).select("email");

      if (!isUserExist)
        return res
          .status(401)
          .json({ flag: false, message: "Unauthorized request" });

      req.user = isUserExist;
      next();
    } else {
      return res
        .status(401)
        .json({ flag: false, message: "Unauthorized request" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ flag: false, message: "Unauthorized request" });
  }
};

const userVerifyToken = async (req, res, next) => {
  try {
    if (req?.headers?.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const userData = jwt.verify(token, process.env.JWT_SECRET);
      if (!userData)
        return res
          .status(401)
          .json({ flag: false, message: "Unauthorized request" });

      const loginType = userData.loginType;

      const dbQuery =
        loginType === "email"
          ? { _id: userData._id, password: userData.password }
          : { _id: userData._id };

      const isUserExist = await User.findOne(dbQuery).select("email");

      if (!isUserExist)
        return res
          .status(401)
          .json({ flag: false, message: "Unauthorized request" });

      req.user = isUserExist;
      next();
    } else {
      return res
        .status(401)
        .json({ flag: false, message: "Unauthorized request" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ flag: false, message: "Unauthorized request" });
  }
};

module.exports = {
  issueToken,
  verifyToken,
  userVerifyToken,
};
