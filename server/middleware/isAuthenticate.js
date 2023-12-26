require("dotenv").config();
const Models = require("../models");
const { decodeJWTToken } = require("../utils/jwtUtils");

// token check
exports.isLogin = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token)
      return res
        .status(401)
        .send({ status: false, message: "Token required", data: [] });

    token = token.split(" ")[1];
    const decodeToken = decodeJWTToken(token);
    req.userId = decodeToken.userId;
    next();
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .send({ status: false, message: "Invalid or expired token", data: [] });
  }
};

// admin verification
exports.isAdmin = async (req, res, next) => {
  try {
    const uId = req.userId;
    const fetchUser = await Models.Users.findOne({
      attributes: { exclude: ["password"] },
      where: { id: uId },
    });
    if (fetchUser.role !== 0)
      return res
        .status(401)
        .send({
          status: false,
          message: "You cannot access the admin page",
          data: [],
        });
    next();
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .send({
        status: false,
        message: "Administrator authentication error",
        data: [],
      });
  }
};

exports.isAgent = async (req, res, next) => {
  try {
    const uId = req.userId;
    const fetchUser = await Models.Users.findOne({
      attributes: { exclude: ["password"] },
      where: { id: uId },
    });

    if (fetchUser.role !== 1) {
      return res
        .status(401)
        .send({
          status: false,
          message: "You cannot access this page",
          data: [],
        });
    }

    next();
  } catch (err) {
    console.error(err);
    res
      .status(401)
      .send({
        status: false,
        message: "Administrator authentication error",
        data: [],
      });
  }
};
