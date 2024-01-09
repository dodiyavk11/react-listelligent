const Models = require("../models");

exports.addFaqs = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const checkIf = await Models.faqs.findOne({ where: { question } });
    if (checkIf) {
      return res
        .status(400)
        .send({ status: false, message: "Faqs question already exists" });
    }
    const addData = { question, answer };
    const addFaqs = await Models.faqs.create(addData);
    return res.status(200).send({
      status: true,
      message: "Promo code saved successfully.",
      data: addFaqs,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "Faqs cannot save, an error occured.",
      error: err.message,
    });
  }
};

exports.listFaq = async (req, res) => {
  try {
    const getFaq = await Models.faqs.findAll();
    res.status(200).send({
      status: true,
      message: "Faqs fecthed successfully.",
      data: getFaq,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please Try again.",
      data: [],
      error: err.message,
    });
  }
};

exports.getFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const getFaq = await Models.faqs.findOne({ where: { id: id } });
    if (getFaq) {
      res
        .status(200)
        .send({ status: true, message: "FAQ get Success.", data: getFaq });
    } else {
      res
        .status(500)
        .send({ status: false, message: "FAQ not found", data: [] });
    }
  } catch {
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please try again",
      data: [],
      error: err.message,
    });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { question } = req.body;
    const { answer } = req.body;
    const updateData = { question, answer };

    const update = await Models.faqs.update(updateData, { where: { id: id } });
    if (update == 1) {
      res.status(200).send({
        status: true,
        message: "FAQ updated successfully.",
        data: update,
      });
    } else {
      res.status(500).send({
        status: false,
        message: "FAQ not found or Something went to  wrong.",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please try again.",
      data: [],
      error: err.message,
    });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFaq = await Models.faqs.destroy({ where: { id: id } });
    if (deleteFaq) {
      res.status(200).send({
        status: true,
        message: "FAQ deleted successfully.",
        data: deleteFaq,
      });
    } else {
      res.status(500).send({
        status: false,
        message: "FAQ not found or Something went to wrong, Please try again",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please try again.",
      data: [],
      error: err.message,
    });
  }
};
/* FAQs end here */
/* Promo code start here */
exports.addPromoCode = async (req, res) => {
  try {
    const { code, description, discount_amount } = req.body;
    const checkIf = await Models.promoCode.findOne({ where: { code } });
    if (checkIf) {
      return res
        .status(400)
        .send({ status: false, message: "Promo code already exists" });
    }
    const addData = { code, description, discount_amount };
    const addPromoCode = await Models.promoCode.create(addData);
    return res.status(200).send({
      status: true,
      message: "Promo code saved successfully.",
      data: addPromoCode,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "Promo code cannot save, an error occured.",
      error: err.message,
    });
  }
};

exports.listPromoCode = async (req, res) => {
  try {
    const getFaq = await Models.promoCode.findAll();
    res.status(200).send({
      status: true,
      message: "Promo code fecthed successfully.",
      data: getFaq,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please Try again.",
      data: [],
      error: err.message,
    });
  }
};

exports.getPromoCode = async (req, res) => {
  try {
    const { id } = req.params;
    const getPromoCode = await Models.promoCode.findOne({ where: { id: id } });
    if (getPromoCode) {
      res
        .status(200)
        .send({
          status: true,
          message: "Promo code get Success.",
          data: getPromoCode,
        });
    } else {
      res
        .status(500)
        .send({ status: false, message: "Promo code not found", data: [] });
    }
  } catch {
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please try again",
      data: [],
      error: err.message,
    });
  }
};

exports.updatePromoCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, description, discount_amount } = req.body;
    const updateData = { code, description, discount_amount };

    const update = await Models.promoCode.update(updateData, {
      where: { id: id },
    });
    if (update == 1) {
      res.status(200).send({
        status: true,
        message: "Promo code updated successfully.",
        data: update,
      });
    } else {
      res.status(500).send({
        status: false,
        message: "Promo code not found or Something went to  wrong.",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please try again.",
      data: [],
      error: err.message,
    });
  }
};

exports.deletePromoCode = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePromoCode = await Models.promoCode.destroy({ where: { id: id } });
    if (deletePromoCode) {
      res.status(200).send({
        status: true,
        message: "Promo code deleted successfully.",
        data: deletePromoCode,
      });
    } else {
      res.status(500).send({
        status: false,
        message: "Promo code not found or Something went to wrong, Please try again",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please try again.",
      data: [],
      error: err.message,
    });
  }
};
