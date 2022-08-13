const app = require('./app');
const { conn, User } = require('./db');

console.log("hello world");

const setUp = async()=> {
  try {
    await conn.sync({ force: true });
    await User.create({ username: 'moe', password: 'moe_pw'});
    await User.create({ username: 'lucy', password: 'lucy_pw'});
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};
console.log('hi')

setUp();
