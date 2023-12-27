"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class agentActiveZipcode extends Model {
    static associate(models) {
        // this.belongsTo(models.Users, {
        //     foreignKey: 'user_id',
        //     as: 'user',
        // });
    }
  }
  agentActiveZipcode.init(
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
      modelName: "agentActiveZipcode",
      paranoid: false,
      tableName: "agent_active_zipcode",
    }
  );
  return agentActiveZipcode;
};
