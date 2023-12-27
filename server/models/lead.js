"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class lead extends Model {
    static associate(models) {}
  }
  lead.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      zip_code: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: false,
      tableName: "lead",
    }
  );
  return lead;
};
