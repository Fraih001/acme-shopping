const express = require('express');
const app = express();
const { User, Product } = require('./db');
const path = require('path');
app.use(express.json());
app.use('/dist', express.static('dist'));

const isLoggedIn = async(req, res, next)=> {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  }
  catch(ex){
    next(ex);
  }
};

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use('/api/orders', require('./routes/orders'));
app.use('/api/sessions', require('./routes/sessions'));
// app.use('/api/products', require('./routes/products'));

app.get('/api/products', async(req,res,next)=>{
  try{
    res.status(200).send(await Product.findAll())

  }catch(er){
    next(er);
  }
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err });
});

module.exports = app
