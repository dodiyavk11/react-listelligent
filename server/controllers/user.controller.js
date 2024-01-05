const Models = require("../models");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const Sequelize = require("sequelize");
const { generateJWTToken, decodeJWTToken } = require("../utils/jwtUtils");

exports.signUp = async (req, res) => {
  if (req.body.email === "" || req.body.password === "") {
    return res
      .status(409)
      .send({ status: false, message: "Please fill all field ", data: [] });
  }
  try {
    const {
      name,
      license,
      brokerage,
      office_address,
      zip_code,
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
      brokerage,
      office_address,
      zip_code,      
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
    const getUser = await Models.Users.findOne({
      where: { email },
    });
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
    const activeZipCodes = await Models.orderZipCode.count({
      where: {
        start_date: { [Sequelize.Op.lte]: moment().format("YYYY-MM-DD") },
        end_date: { [Sequelize.Op.gte]: moment().format("YYYY-MM-DD") },
        user_id: getUser.dataValues.id,
      },
    });
    getUser.dataValues.activeZipcode = activeZipCodes;
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

exports.userAddLead = async (req, res) => {
  try {
    const { name, phone, email, address, zip_code, agent_zip_code } = req.body;
    const leadData = { name, phone, email, address, zip_code, agent_zip_code, status: 0 };
    const addLead = await Models.Lead.create(leadData);
    return res.status(200).send({
      status: true,
      message: "Data saved successfully.",
      data: addLead,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "Lead can not save, an error occured",
      error: err.message,
      data: [],
    });
  }
};

exports.getUserProfile = async(req, res) => {
  try{
    const id = req.userId;
    const getAgentProfile = await Models.Users.findOne({ 
      where: { id }, 
      attributes: { exclude: ['password','role'] }
    });
    return res.status(200).send({ status: true, message: "Profile get successfully.", data: getAgentProfile });
  }catch(err){
    return res.status(500).send({ status: false, message: "Profile cannot get, an error occured.", error: err.message });
  }
}

exports.userProfileUpdate = async(req, res) => {
  try{
    const id = req.userId;
    const { name, license, brokerage, office_address, zip_code } = req.body;
    const updateInfo = { name, license, brokerage, office_address, zip_code };
    const updateUser = await Models.Users.update(updateInfo,{ where: { id } });
    return res.status(200).send({ status: true, message: "Profile update successfully.", data: updateUser });
  }catch(err){
    return res.status(500).send({ status: false, message: "Profile cannot update, an error occured.", error: err.message });
  }
}