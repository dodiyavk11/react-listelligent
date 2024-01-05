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

exports.viewUserLead = async (req, res) => {
  try {
    const { id } = req.params;
    const getData = await Models.lead.findOne({ where: { id } });
    if (getData) {
      return res.status(200).send({
        status: true,
        message: "User lead fetched success.",
        data: getData,
      });
    }
    return res.status(404).send({
      status: false,
      message: "Lead not found or something went to wrong.",
      data: [],
    });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: "User lead cannot get, an error occured",
        error: err.message,
      });
  }
};

exports.userLeadList = async (req, res) => {
  try {
    const getData = await Models.lead.findAll();
    res
      .status(200)
      .send({
        status: true,
        message: "User lead get successfully.",
        data: getData,
      });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: "User lead cannot get, an error occured.",
        error: err.message,
        data: [],
      });
  }
};

exports.viewAgentByAdmin = async(req, res) => {
  try{
    const { id } = req.params;
    const agentData = await Models.Users.findOne({ where:{ id } });
    if(agentData)
    {
      return res.status(200).send({ status: true, message: "Agent data get successfully.", data: agentData });
    }
    return res.status(404).send({ status: false, message: "Agent cannot found or something went to wrong", data: [] })
  }catch(err)
  {
    res.status(500).send({ status: false, message: "Agent cannot view, an error occured.", error: err.message });
  }
}

exports.getAdminOrders = async(req, res) => {
  try
  {
    const getOrders = await Models.Orders.findAll({
      include:[
        {
          model: Models.orderZipCode,
          as: "orderProduct",
        },
        {
          model: Models.Users,
          as: "user",
          attributes: ["name", "email"],
        }
      ],
      order: [['id', 'DESC']],
    })
    res.status(200).send({ status: true, message: "Order get successfully", data: getOrders })
  }catch(err)
  {
    res.status(500).send({ status: false, message: "Admin order cannot get, an error occured.", error: err.message });
  }
}

exports.getAdminLeads = async(req, res) => {
  try{
    const getLeads = await Models.Lead.findAll({
      order: [['id', 'DESC']],
    });
    return res.status(200).send({ status: true, message: "Leads get successfully.", data: getLeads });
  }catch(err){
    return res.status(500).send({ status: false, message: "Admin Leads cannot get, an error occured.", data:[], error: err.message });
  }
}

exports.updateOrderStatus = async(req, res) => {
  try{
    const { id, status } = req.params;
    const updateOrderStatus = await Models.Orders.update({ status }, {where: { id } });
    const updateOrderProductStatus = await Models.orderZipCode.update({ status }, {where: { order_id: id } });
    return res.status(200).send({ status: true, message: "Order status update successfully", data: updateOrderStatus });
  }catch(err){
    return res.status(200).send({ status: false, message: "Order status can not update, an error occured.", error: err.message });
  }
}