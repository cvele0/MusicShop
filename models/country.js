'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Manufacturer, Product, Customer}) {
      this.hasMany(Manufacturer, {foreignKey: "countryID"});
      this.hasMany(Product, {foreignKey: "countryID"});
      this.hasMany(Customer, {foreignKey: "countryID"});
    }
  }
  Country.init({
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};
