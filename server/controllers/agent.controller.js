const Models = require("../models");

exports.getAllAgentsList = async (req, res) => {
  try {
    const getAgent = await Models.Users.findAll({
      where: { role: 1 },
      attributes: { exclude: ["password"] },
    });
    res
      .status(200)
      .send({
        status: true,
        message: "Agent list fetched successfully",
        data: getAgent,
      });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: "Something went to wrong, Please try again",
        error: err.message,
      });
  }
};
