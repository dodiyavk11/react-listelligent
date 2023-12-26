"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class zipCode extends Model {
    static associate(models) {}
  }
  zipCode.init({
    city:DataTypes.STRING,
    zip_code:DataTypes.INTEGER,
    prize:DataTypes.DECIMAL(10,1),
    status:DataTypes.INTEGER
  },{
    sequelize,
    timestamps: false,
    modelName: "zipCode",
    paranoid: false,
    tableName: "zip_codes",
  });
  return zipCode;
};
