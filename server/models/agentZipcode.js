"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class agentZipcode extends Model {
    static associate(models) {
        // this.belongsTo(models.Users, {
        //     foreignKey: 'user_id',
        //     as: 'user',
        // });
    }
  }
  agentZipcode.init(
    {
      user_id: DataTypes.INTEGER,
      zip_id: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      transaction_id: DataTypes.STRING,
      status: DataTypes.INTEGER    
    },
    {
      sequelize,
      timestamps:true,
      createdAt:"created_at",
      updatedAt:"updated_at",
      modelName: "agentZipcode",
      paranoid: false,
      tableName: "agent_zipcode",
    }
  );
  return agentZipcode;
};
