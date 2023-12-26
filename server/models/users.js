"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // association
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      license: DataTypes.BOOLEAN,
      license_date: DataTypes.DATE,
      mls_id: DataTypes.STRING,
      brokerage: DataTypes.STRING,
      office_address: DataTypes.STRING,
      building: DataTypes.STRING,
      zip_code: DataTypes.INTEGER,
      hp_address: DataTypes.STRING,
      hp_zip_code: DataTypes.STRING,
      hp_sales_price: DataTypes.STRING,
      realtor_profile: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      modelName: "Users",
      paranoid: false,
      tableName: "users",
    }
  );
  return User;
};
