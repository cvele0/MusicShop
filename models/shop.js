'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Employee, Department, Instrument}) {
      this.hasMany(Employee, {foreignKey: "shopID"});
      this.hasMany(Department, {foreignKey: "shopID"});
      this.hasMany(Instrument, {foreignKey: "shopID"});
    }
  }
  Shop.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shop',
  });
  return Shop;
};
