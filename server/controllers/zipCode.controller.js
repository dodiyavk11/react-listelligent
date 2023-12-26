const Models = require("../models");
const multer = require("multer");
const csvParser = require("csv-parser");
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
    const getZipCode = await Models.zipCode.findAll();
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
    return res
      .status(500)
      .send({
        status: false,
        message: "Zip code CSV file data cannot added, an error occured.",
        data: [],
        error: err.message
      });
  }
};
