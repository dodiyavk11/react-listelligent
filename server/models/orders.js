"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      this.hasMany(models.orderZipCode, {
        foreignKey: "order_id",
      });
    }
  }
  Orders.init(
    {
      user_id: DataTypes.INTEGER,
      total: DataTypes.DECIMAL(10, 2),
      transaction_id: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: false,
      tableName: "zip_orders",
      modelName: "Orders",
    }
  );
  return Orders;
};
