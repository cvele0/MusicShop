'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Customer, ProductOrder}) {
      this.belongsTo(Customer, {foreignKey: "customerID"});
      this.hasMany(ProductOrder, {foreignKey: "orderID"});
    }
  }
  Order.init({
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
