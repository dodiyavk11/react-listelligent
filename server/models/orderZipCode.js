"use strict";
const { Model } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class orderZipCode extends Model {
    static associate(models) {
      this.belongsTo(models.Orders, {
        foreignKey: "order_id",
      });
    }
  }
  orderZipCode.init(
    {
      order_id: DataTypes.INTEGER,
      zip_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      zip_code: DataTypes.INTEGER,
      city: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("start_date");
          return moment(rawValue).format("DD-MM-YYYY");
        },
        set(value) {
          const formattedDate = moment(value, "DD-MM-YYYY", true).format(
            "YYYY-MM-DD"
          );
          this.setDataValue("start_date", formattedDate);
        },
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("end_date");
          return moment(rawValue).format("DD-MM-YYYY");
        },
        set(value) {
          const formattedDate = moment(value, "DD-MM-YYYY", true).format(
            "YYYY-MM-DD"
          );
          this.setDataValue("end_date", formattedDate);
        },
      },
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      paranoid: false,
      tableName: "zip_orders_product",
      modelName: "orderZipCode",
    }
  );
  return orderZipCode;
};
