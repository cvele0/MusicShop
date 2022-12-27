'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manufacturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Instrument, Country}) {
      this.hasMany(Instrument, {foreignKey: "manufacturerID"});
      this.belongsTo(Country, {foreignKey: "countryID"});
    }
  }
  Manufacturer.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Manufacturer',
  });
  return Manufacturer;
};
