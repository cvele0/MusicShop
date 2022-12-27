'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Shop}) {
      this.belongsTo(Shop, {foreignKey: "shopID"});
    }
  }
  Department.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};
