const { conn, User, Product } = require('./db');
const app = require('supertest')(require('./app'));
const { expect } = require('chai');
const jwt = require('jsonwebtoken');

describe('Shopping', ()=> {
  beforeEach(async()=> {
    await conn.sync({ force: true });
    await User.create({ username: 'moe', password: 'MOE'});
    await Product.create({ name: 'foo'});
  });

  describe('Successful Authentication', ()=> {
    it('Logs the User In', async()=> {
      let response = await app.post('/api/sessions')
        .send({ username: 'moe', password: 'MOE'});

      expect(response.status).to.equal(200);
      const token = response.body.token;
      expect(token).to.be.ok;
      response = await app.get('/api/sessions')
        .set('authorization', token);
      expect(response.status).to.equal(200);
      expect(response.body.username).to.equal('moe');

    });
  });
  describe('The Shopping Experience', ()=> {
    it('User can create an order', async()=> {
      const moe = await User.findOne({
        where: {
          username: 'moe'
        }
      });
      const token = jwt.sign({ id: moe.id}, process.env.JWT);

      let response = await app.get('/api/orders/cart')
        .set('authorization', token);
      response = await app.post('/api/orders')
        .set('authorization', token);
      expect(response.status).to.equal(200);
    });
    it('For first request, user gets an empty cart', async()=> {
      const moe = await User.findOne({
        where: {
          username: 'moe'
        }
      });
      const token = jwt.sign({ id: moe.id}, process.env.JWT);

      const response = await app.get('/api/orders/cart')
        .set('authorization', token);
      expect(response.status).to.equal(200);
      expect(response.body.lineItems).to.eql([]);

    });
    it('The same cart is returned to user', async()=> {
      const moe = await User.findOne({
        where: {
          username: 'moe'
        }
      });
      const token = jwt.sign({ id: moe.id}, process.env.JWT);

      let response = await app.get('/api/orders/cart')
        .set('authorization', token);
      const cart = response.body;
      response = await app.get('/api/orders/cart')
        .set('authorization', token);
      expect(response.body.id).to.equal(cart.id);

    });
    describe('adding an item to a cart', ()=> {
      describe('setting quantity to zero', ()=> {
        it('remove it from cart', async()=> {
          const moe = await User.findOne({
            where: {
              username: 'moe'
            }
          });
          const foo = await Product.findOne({
            where: {
              name: 'foo'
            }
          });
          const token = jwt.sign({ id: moe.id}, process.env.JWT);

          let response = await app.put('/api/orders/cart')
            .set('authorization', token)
            .send({ product: foo, quantity: 3});
          expect(response.status).to.equal(200);
          const lineItem = response.body.lineItems.find( lineItem => lineItem.productId === foo.id);
          expect(lineItem).to.be.ok;
          response = await app.put('/api/orders/cart')
            .set('authorization', token)
            .send({ product: foo, quantity: 0});
          expect(response.body.lineItems).to.eql([]);

        });
      });
      describe('for the first time', ()=> {
        it('creates a line item', async()=> {
          const moe = await User.findOne({
            where: {
              username: 'moe'
            }
          });
          const foo = await Product.findOne({
            where: {
              name: 'foo'
            }
          });
          const token = jwt.sign({ id: moe.id}, process.env.JWT);

          const response = await app.put('/api/orders/cart')
            .set('authorization', token)
            .send({ product: foo, quantity: 3});
          expect(response.status).to.equal(200);
          const lineItem = response.body.lineItems.find( lineItem => lineItem.productId === foo.id);
          expect(lineItem).to.be.ok;

        });
      });
      describe('not the first time', ()=> {
        it('updates a lineItem', async()=> {
          const moe = await User.findOne({
            where: {
              username: 'moe'
            }
          });
          const foo = await Product.findOne({
            where: {
              name: 'foo'
            }
          });
          const token = jwt.sign({ id: moe.id}, process.env.JWT);

          let response = await app.put('/api/orders/cart')
            .set('authorization', token)
            .send({ product: foo, quantity: 3});

          expect(response.status).to.equal(200);
          const lineItem = response.body.lineItems.find( lineItem => lineItem.productId === foo.id);
          response = await app.put('/api/orders/cart')
            .set('authorization', token)
            .send({ product: foo, quantity: 7});
          const updatedLineItem = response.body.lineItems.find( lineItem => lineItem.productId === foo.id);
          expect(updatedLineItem.id).to.equal(lineItem.id);


        });
      });
    });
  });
});
