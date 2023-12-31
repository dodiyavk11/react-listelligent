"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      this.hasMany(models.orderZipCode, {
        foreignKey: "order_id",
        as: "orderProduct"
      });
      this.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Orders.init(
    {
      user_id: DataTypes.INTEGER,
      total: DataTypes.DECIMAL(10, 2),
      transaction_id: DataTypes.STRING,
      status: DataTypes.INTEGER,
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
