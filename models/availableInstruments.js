'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AvailableInstruments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  AvailableInstruments.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AvailableInstruments',
  });
  return AvailableInstruments;
};
