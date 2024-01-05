const Models = require("../models");
const moment = require("moment");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

exports.getAllAgentsList = async (req, res) => {
  try {
    const getAgent = await Models.Users.findAll({
      where: { role: 1 },
      attributes: { exclude: ["password"] },
    });
    res.status(200).send({
      status: true,
      message: "Agent list fetched successfully",
      data: getAgent,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please try again",
      error: err.message,
    });
  }
};

exports.addToCartZip = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.userId;
    const checkZip = await Models.zipCode.findOne({ where: { id } });
    if (checkZip) {
      const existingCartItem = await Models.Cart.findOne({
        where: { user_id, zip_id: checkZip.id },
      });
      if (!existingCartItem) {
        const cartItem = {
          user_id,
          zip_id: checkZip.id,
          price: checkZip.prize,
          zip_code: checkZip.zip_code,
          city: checkZip.city,
        };
        await Models.Cart.create(cartItem);
      }
      const getCart = await Models.Cart.findAll({
        include: [
          {
            model: Models.zipCode,
            as: "zipCode",
          },
        ],
        where: { user_id },
      });
      return res.status(200).send({
        status: true,
        message: "Zip code add to cart success",
        data: getCart,
      });
    }
    return res
      .status(400)
      .send({ status: false, message: "Zip code cannot found." });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Zip code cannot add to cart, an error occured.",
      error: err.message,
    });
  }
};

exports.getAgentCart = async (req, res) => {
  try {
    const user_id = req.userId;
    const getCart = await Models.Cart.findAll({
      include: [
        {
          model: Models.zipCode,
          as: "zipCode",
        },
      ],
      where: { user_id },
    });
    res.status(200).send({
      status: true,
      message: "Cart data get successfully.",
      data: getCart,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Cart cannot get, an error occured.",
      error: err.message,
    });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const user_id = req.userId;
    const { cart_id } = req.params;
    const hasData = await Models.Cart.findOne({
      where: { id: cart_id, user_id },
    });
    if (hasData) {
      await hasData.destroy();
      const getCart = await Models.Cart.findAll({
        include: [
          {
            model: Models.zipCode,
            as: "zipCode",
          },
        ],
        where: { user_id },
      });
      return res
        .status(200)
        .send({ status: true, message: "Success.", data: getCart });
    } else {
      return res
        .status(422)
        .send({ status: false, message: "Cart item not found." });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong.",
      error: err.message,
    });
  }
};

exports.cartPlaceOrder = async (req, res) => {
  try {
    const user_id = req.userId;
    const getCart = await Models.Cart.findAll({
      where: { user_id },
    });
    const cartTotal = await calculateCartTotal(getCart);
    if (cartTotal > 0) {
      const newOrder = await Models.Orders.create({
        user_id,
        total: cartTotal,
        transaction_id: "just test",
        status:0
      });
      const { startDate, endDate } = getAgoDate();
      const orderZipCodeItems = getCart.map((cartItem) => ({
        order_id: newOrder.id,
        zip_id: cartItem.zip_id,
        user_id,
        zip_code: cartItem.zip_code,
        city: cartItem.city,
        price: cartItem.price,
        start_date: startDate,
        end_date: endDate,
        status: 0,
      }));
      const orderZipCode = await Models.orderZipCode.bulkCreate(
        orderZipCodeItems
      );

      await Models.Cart.destroy({
        where: { user_id },
      });
      res.status(200).send({
        status: true,
        message: "Your order placed successfully.",
        data: newOrder,
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Order amount cannot be zero",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Your order cannot place, an error occured.",
      error: err.message,
    });
  }
};

async function calculateCartTotal(cart) {
  try {
    return cart.reduce((total, item) => {
      return total + parseFloat(item.price);
    }, 0);
  } catch (err) {
    return false;
  }
}

function getAgoDate() {
  const currentDate = moment();
  const agoDate = moment(currentDate).add(1, "months");
  const startDate = currentDate.format("DD-MM-YYYY");
  const endDate = agoDate.format("DD-MM-YYYY");
  return { startDate, endDate };
}

exports.getAgentActiveZipCode = async (req, res) => {
  try {
    const user_id = req.userId;
    const activeZipCodes = await Models.orderZipCode.findAll({
      where: {
        start_date: { [Sequelize.Op.lte]: moment().format("YYYY-MM-DD") },
        end_date: { [Sequelize.Op.gte]: moment().format("YYYY-MM-DD") },
        user_id,
      },
    });
    return res.status(200).send({
      status: true,
      message: "Active zip code fetched success.",
      data: activeZipCodes,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong",
      data: [],
      error: err.message,
    });
  }
};

exports.getAgentLeads = async (req, res) => {
  try {
    const user_id = req.userId;
    const activeZipCode = await Models.orderZipCode.findAll({
      where: { user_id },
    });
    const zipCodes = activeZipCode.map((result) => result.zip_code);
    const leadData = await Models.Lead.findAll({
      where: {
        agent_zip_code: { [Op.in]: zipCodes },
      },
      order: [['status', 'ASC']],
    });
    res.status(200).send({ status: true, data: leadData });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: "Leads cannot fetched, an error occured",
        error: err.message,
      });
  }
};

exports.showUserAgentList = async(req, res) => {
  try
  {
    const user_id = req.user_id;
    const { zipcode } = req.params;
    if(zipcode)
    {
      const agentList = await Models.Users.findAll({
      include: [
          {
            model: Models.orderZipCode,
            as: "activeZipcode",
            where: { zip_code: zipcode, status: 1 },
          },
        ]        
      })
      return res.status(200).send({ status: true, data: agentList });
    }    
    return res.status(500).send({ status: false, message: "Something went to wrong", data:[] });
  }catch(err)
  {
    res.status(500).send({ status: false, message: "Agent list cannot get, an error occured", error: err.message });
  }
}

exports.viewAgentByUser = async(req, res) => {
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

exports.getAgentOrdersList = async(req, res) => {
  try{
    const user_id = req.userId;
    const getOrders = await Models.Orders.findAll({
      include:[
        {
          model: Models.orderZipCode,
          as: "orderProduct",
        }
      ],
      where: { user_id },
      order: [['id', 'DESC']],
    })
    res.status(200).send({ status: true, message: "Order get successfully", data: getOrders })
  }catch(err){
    res.status(500).send({ status: false, message: "Agnet order can not get, an error occured.", error: err.message });
  }
}

exports.agentUpdateLeadStatus = async(req, res) => {
  try{
    const { id, status } = req.params;
    const user_id =req.userId;
    const updateStatus = await Models.Lead.update(
      { status },
      { where: { id } }
    );
    return res.status(200).send({ status: true, message: "Status update successfully.", data: updateStatus });
  }catch(err)
  {
    return res.status(500).send({ status: false, message: "Status cannot update, an error occured", error: err.message });
  }
}