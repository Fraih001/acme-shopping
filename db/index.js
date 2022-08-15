const conn = require('./conn');
const { Sequelize } = conn;
const Product = require('./Product');
const User = require('./User');
const LineItem = require('./LineItem');
const Order = require('./Order');

User.hasMany(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

module.exports = {
  conn,
  User,
  Product,
  LineItem,
  Order
};
