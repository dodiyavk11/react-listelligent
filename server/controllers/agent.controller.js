const Models = require("../models");

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
        };
        await Models.Cart.create(cartItem);
      }
      const getCart = await Models.Cart.findAll({ where: { user_id } });
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
    res
      .status(200)
      .send({
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
