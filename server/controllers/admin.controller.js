require("dotenv").config();
const Models = require("../models");
const nodemailer = require("nodemailer");

exports.adminApproveAgent = async (req, res) => {
  try {
    const { id, status } = req.params;
    const [affectedRows] = await Models.Users.update(
      { status },
      { where: { id } }
    );
    if (affectedRows > 0) {
      const agentData = await Models.Users.findOne({ where: { id } });
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });
      let message = "Your account has been blocked by admin";
      if (status === "1") {
        message = "Your account has been activeted";
      }
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: agentData.email,
        subject: message,
        text: `User Name:- ${agentData.email} \n
        Password:- You choosed`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        }
      });
      res.status(200).json({
        status: true,
        message: "Agent status updated successfully",
        data: affectedRows,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Agent not found or status was not updated",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Agent can not active an error occured.",
      error: err.message,
    });
  }
};
