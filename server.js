const app = require('./app');
const { conn, User, Product } = require('./db');
const { faker } = require('@faker-js/faker');

// line 5 - 16 = create array of 50 random games

const gamesArray = [];

function createRandomGames(){
  return {
    name: `${faker.random.word()}`,
    description: `${faker.lorem.sentences(3)}`
  }
};

Array.from({length: 50}).forEach(()=> gamesArray.push(createRandomGames()));

const setUp = async()=> {
  try {
    await conn.sync({ force: true });
    await User.create({ username: 'moe', password: 'moe_pw'});
    const lucy = await User.create({ username: 'lucy', password: 'lucy_pw'});
    const foo = await Product.create({ name: 'foo' }); 
    const bar = await Product.create({ name: 'bar' }); 

    // faker test
    const bazz = await Product.create({ name: `${faker.commerce.product()}` }); 

    await lucy.addToCart({ product: foo, quantity: 3 });
    await lucy.addToCart({ product: bar, quantity: 4 });
    await lucy.addToCart({ product: bazz, quantity: 1 });
    
    // generate 50 fake games (name + description)
    await Promise.all( gamesArray.map( game => Product.create(game)));

    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

setUp();
