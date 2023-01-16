'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Shop, Manufacturer, Product}) {
      this.belongsTo(Shop, {foreignKey: "shopID"});
      this.belongsTo(Manufacturer, {foreignKey: "manufacturerID"});
      this.hasMany(Product, {foreignKey: "instrumentID"});
    }
  }
  Instrument.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Instrument',
  });
  return Instrument;
};
