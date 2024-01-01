"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      this.belongsTo(models.zipCode, {
        foreignKey: "zip_id",
        as: "zipCode",
      });
    }
  }
  Cart.init(
    {
      user_id: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10, 2),
      zip_code:DataTypes.INTEGER,
      city:DataTypes.STRING,
      validity: DataTypes.INTEGER,
      zip_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      paranoid: false,
      modelName: "Cart",
      tableName: "cart",
    }
  );
  return Cart;
};
