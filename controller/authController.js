const { validateUserForCompare, userModel } = require("../models/user");
const hash = require("../utils/hash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const validateUser = async (req, res) => {
  try {
    const { body } = res;
    const { error } = validateUserForCompare(body);

    if (error) return res.status(400).send({ message: error.message });

    const user = await userModel.findOne({
      email: body.email,
    });

    if (!user) return res.status(400).send({ message: "invalid email adress" });

    const isValidPassword = await bcrypt.compare(body.password, user.password);

    if (!isValidPassword)
      return res.status(400).send({ message: "password is not valid" });

    const { password, ...resData } = user.toObject();

    console.log(config.get("jwtPrivateKey"));

    const token = jwt.sign(resData, config.get("jwtPrivateKey"), {
      expiresIn: "24h",
    });

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { validateUser };
