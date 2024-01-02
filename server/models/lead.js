"use strict";
const { Model } = require("sequelize");
const moment = require("moment");

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
      created_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
          get() {
            const rawValue = this.getDataValue('created_at');
            return moment(rawValue).format('YYYY-MM-DD HH:mm:ss');
          },
        },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: false,
      tableName: "lead",
      modelName:"Lead"
    }
  );
  return lead;
};
