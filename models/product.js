'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Country, Instrument, ProductOrder}) {
      this.belongsTo(Country, {foreignKey: "countryID"});
      this.belongsTo(Instrument, {foreignKey: "instrumentID"});
      this.hasMany(ProductOrder, {foreignKey: "productID"});
    }
  }
  Product.init({
    year: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
