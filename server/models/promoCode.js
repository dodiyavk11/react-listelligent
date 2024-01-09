"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class promoCode extends Model {
    static associate(models) {      
    }
  }
  promoCode.init(
    {
      code: DataTypes.STRING,
      description: DataTypes.STRING,
      discount_amount: DataTypes.DECIMAL(10, 2),
      expiration_date: DataTypes.DATE,
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      paranoid: false,
      modelName: "promoCode",
      tableName: "promo_codes",
    }
  );
  return promoCode;
};
