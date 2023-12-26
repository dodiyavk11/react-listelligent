const Models = require("../models");
const bcrypt = require("bcryptjs");
const { generateJWTToken, decodeJWTToken } = require("../utils/jwtUtils");

exports.signUp = async (req, res) => {
  try {
    const {
      name,
      license,
      license_date,
      mls_id,
      brokerage,
      office_address,
      building,
      zip_code,
      hp_address,
      hp_zip_code,
      hp_sales_price,
      realtor_profile,
      email,
      role,
      password,
    } = req.body;
    if (role !== "1") {
      return res.status(401).send({
        status: false,
        message:
          "Your request could not be proccess due to some unwanted activity",
        data: [],
      });
    }
    const checkUser = await Models.Users.findOne({ where: { email } });
    if (checkUser && checkUser.dataValues.email) {
      return res
        .status(409)
        .send({ status: false, message: "User already registered ", data: [] });
    }
    const hashedPassword = await bcrypt.hash(password, 11);
    const userInfo = {
      name,
      license,
      license_date,
      mls_id,
      brokerage,
      office_address,
      building,
      zip_code,
      hp_address,
      hp_zip_code,
      hp_sales_price,
      realtor_profile,
      email,
      role,
      password: hashedPassword,
      status: 0,
    };

    const addUser = await Models.Users.create(userInfo);
    delete addUser.dataValues.password;
    res.status(200).send({
      status: true,
      message:
        "Register successfully. Please confirm your email address via email",
      data: addUser,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).send({
      status: false,
      message: "Registration refused, something went wrong",
      data: [],
      error: err.message,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const getUser = await Models.Users.findOne({ where: { email } });
    if (!getUser)
      return res.status(401).send({
        status: false,
        message: "User not found, please register first",
        data: [],
      });

    const isMatch = await bcrypt.compare(password, getUser.password);
    if (!isMatch)
      return res
        .status(401)
        .send({ status: false, message: "Invalid credentials", data: [] });

    if (!getUser.status && getUser.role !== 0) {
      return res.status(401).send({
        status: false,
        message:
          "Your account under reivew Admin approve your account then after you can access.",
        data: [],
      });
    }
    const token = generateJWTToken({ userId: getUser.id }, "1h");
    delete getUser.dataValues.password;
    res.status(200).send({
      status: true,
      message: "Login Successful",
      token,
      data: getUser,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).send({
      status: false,
      message: "Login refused, something went wrong",
      data: [],
      error: err.message,
    });
  }
};