const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

// ******* AUTH Validation ******* //
const emailSignupValidation = (user) => {
  const joiSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    gender: joi.objectId().required(),
    gender: joi.string().valid("male", "female", "other").required(),
    email: joi.string().email().required(),
    hobbies: joi.array().items(joi.string()).optional(),
    type: joi.string().optional(),
    password: joi.string().required(),
  });

  return joiSchema.validate(user);
};

const loginValidation = (user) => {
  const joiSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  });

  return joiSchema.validate(user);
};

// ---------- AUTH Validation END ---------- //

// ******* USER Validation ******* //

const userUpdateValidation = (user) => {
  const joiSchema = joi.object({
    first_name: joi.string().optional(),
    last_name: joi.string().optional(),
    gender: joi.objectId().optional(),
    email: joi.string().email().optional(),
    hobbies: joi.array().items(joi.string()).optional(),
    type: joi.string().optional(),
    password: joi.string().optional(),
  });

  return joiSchema.validate(user);
};

// ---------- USER Validation END ---------- //

// ******* DEPARTMENT Validation ******* //

const departmentValidation = (department) => {
  const joiSchema = joi.object({
    department_name: joi.string().required(),
    category_name: joi
      .string()
      .valid("HR", "IT", "sales", "product", "marketing")
      .required(),
    location: joi.string().required(),
    salary: joi.number().required(),
    employee_ids: joi.array().items(joi.objectId()).optional(),
  });

  return joiSchema.validate(department);
};

// ---------- DEPARTMENT Validation END ---------- //

module.exports = {
  emailSignupValidation,
  loginValidation,
  userUpdateValidation,
  departmentValidation,
};
