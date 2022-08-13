const conn = require('./conn');
const { Sequelize } = conn;
const { STRING } = Sequelize;

const Product = conn.define('product', {
  name: {
    type: STRING
  },
  description: {
    type: STRING
  }
});

module.exports = Product;

