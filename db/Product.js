const { DATE } = require('sequelize');
const conn = require('./conn');
const { Sequelize } = conn;
const { STRING, TEXT } = Sequelize;

const Product = conn.define('product', {
  name: {
    type: STRING
  },
  summary: {
    type: TEXT
  },
  imageUrl: {
    type: STRING
  },
  rating: {
    type: STRING
  },
  releaseDate:{
    type: DATE
  }
});

module.exports = Product;

