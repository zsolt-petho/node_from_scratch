const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 225,
  },
  email: {
    type: String,
    required: true,
    min: 3,
    max: 225,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
    max: 1024,
  },
});

const complexityOptions = {
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: passwordComplexity(complexityOptions),
  });

  return schema.validate(user);
};
const validateUserForCompare = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: passwordComplexity(complexityOptions),
  });

  return schema.validate(user);
};
const userModel = mongoose.model("User", userSchema);

/* module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
module.exports.userModel = userModel;
module.exports.validateUserForCompare = validateUserForCompare; */

module.exports = {
  userSchema,
  validateUser,
  userModel,
  validateUserForCompare,
};
