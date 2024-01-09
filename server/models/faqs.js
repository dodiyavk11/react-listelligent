"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class faqs extends Model {
    static associate(models) {}
  }
  faqs.init(
    {
      question: DataTypes.STRING,
      answer: DataTypes.STRING,
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      paranoid: false,
      modelName: "faqs",
      tableName: "faqs",
    }
  );
  return faqs;
};
