const express = require('express');
const app = express.Router();
const { Product } = require('../db');
const { isLoggedIn } = require('./middleware');

app.get('/products', isLoggedIn, async(req,res,next)=>{
    try{
      res.status(200).send(await Product.findAll())
        
  
    }catch(er){
      next(er);
    }
  });

app.get('/', isLoggedIn, async(req, res, next)=> {
  res.send(req.user);
});

module.exports = app;
