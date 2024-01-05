const Models = require("../models");
const multer = require("multer");
const csvParser = require("csv-parser");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.addZipCode = async (req, res) => {
  try {
    const { city, zip, prize, status } = req.body;
    const zipData = { city, zip_code: zip, prize, status };
    const isExist = await Models.zipCode.findOne({ where: { zip_code: zip } });
    if (isExist && isExist.zip_code) {
      return res
        .status(409)
        .send({ status: false, message: "Zip code already exists ", data: [] });
    }
    const addZipCode = await Models.zipCode.create(zipData);
    res.status(200).send({
      status: true,
      message: "Zip code added successfully.",
      data: addZipCode,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Zip code cannot added an error occured",
      data: [],
    });
  }
};

exports.getAllZipCode = async (req, res) => {
  try {
    const getZipCode = await Models.zipCode.findAll({
      order: [['id', 'DESC']],
    });
    res.status(200).send({
      status: true,
      message: "Zip code get successfully",
      data: getZipCode,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Zip code cannot get, an error occured",
      error: err.message,
      data: [],
    });
  }
};

exports.zipCodeUpdateStatus = async (req, res) => {
  try {
    const { id, status } = req.params;
    const updateData = await Models.zipCode.update(
      { status },
      { where: { id } }
    );
    res.status(200).send({
      status: true,
      message: "Zip code status update successfully",
      data: updateData,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Zip code status can not update, an error occured",
      data: [],
      error: err.message,
    });
  }
};

exports.excelZipCodeAdd = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .send({ status: false, message: "No file uploaded.", data: [] });
    }
    const fileBuffer = req.file.buffer.toString("utf-8");
    const results = [];

    require("stream")
      .Readable.from(fileBuffer)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        const addedZipCodes = [];

        for (const rowData of results) {
          const { city, zip_code, prize, status } = rowData;
          const zipData = { city, zip_code, prize, status };
          const isExist = await Models.zipCode.findOne({
            where: { zip_code },
          });
          if (!isExist) {
            const addZipCode = await Models.zipCode.create(zipData);
            addedZipCodes.push(addZipCode);
          }
        }

        res.status(200).send({
          status: true,
          message: "Zip code CSV data added successfully.",
          data: addedZipCodes,
        });
      });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "Zip code CSV file data cannot added, an error occured.",
      data: [],
      error: err.message,
    });
  }
};

exports.updateZipCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { zip_code, city, prize, status } = req.body;
    const newData = { zip_code, city, prize, status };
    const isExist = await Models.zipCode.findOne({
      where: {
        zip_code,
        id: {
          [Sequelize.Op.ne]: id,
        },
      },
    });
    if (isExist && isExist.zip_code) {
      return res
        .status(409)
        .send({ status: false, message: "Zip code already exists ", data: [] });
    }
    const updateData = await Models.zipCode.update(newData, { where: { id } });
    res.status(200).send({
      status: true,
      message: "Zip code update successfully",
      data: updateData,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Zip code cannot update, an error occured.",
      data: [],
      error: err.message,
    });
  }
};

exports.deleteZipCode = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await Models.zipCode.destroy({ where: { id } });
    if (deleteData)
      return res.status(200).send({
        status: true,
        message: "Zip code deleted success.",
        data: deleteData,
      });
    return res.status(500).send({
      status: false,
      message: "This record does not exist or Something went to wrong",
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Zip code cannot delete, an error occured.",
      error: err.message,
    });
  }
};

exports.searchZipCode = async (req, res) => {
  try {
    const { q } = req.query;
    const searchResult = await Models.zipCode.findAll({
      where: {
        [Sequelize.Op.or]: [
          { zip_code: { [Sequelize.Op.like]: `%${q}%` } },
          { city: { [Sequelize.Op.like]: `%${q}%` } },
        ],
        status: 1
      },
    });
    const zipIds = searchResult.map((result) => result.id);
    const orderZipCodeResult = await Models.orderZipCode.findAll({
      attributes: [
        "zip_id",
        [
          Sequelize.literal(`COUNT(CASE WHEN status = 1 THEN 1 END)`),
          "orderCount",
        ],
        [
          Sequelize.literal(`COUNT(CASE WHEN status = 1 THEN 1 END) > 2`),
          "isSold",
        ],
      ],
      group: ["zip_id"],
      where: {
        zip_id: { [Op.in]: zipIds },
      },
      raw: true,
    });

    const finalResult = searchResult.map((zip) => {
      const orderZipCodeData = orderZipCodeResult.find(
        (order) => order.zip_id === zip.id
      );
      return {
        ...zip.toJSON(),
        isSold: orderZipCodeData ? orderZipCodeData.isSold : 0,
      };
    });
    return res
      .status(200)
      .send({ status: true, message: "Search result", data: finalResult });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Zip code cannot search, an error occured.",
      data: [],
      error: err.message,
    });
  }
};