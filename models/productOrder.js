'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order, Product}) {
      this.belongsTo(Order, {foreignKey: "orderID"});
      this.belongsTo(Product, {foreignKey: "productID"});
    }
  }
  ProductOrder.init({
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductOrder',
  });
  return ProductOrder;
};
