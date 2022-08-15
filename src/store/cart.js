import axios from 'axios';
const { faker } = require('@faker-js/faker');
const cart = (state = { lineItems: [ ] }, action)=> {
  if(action.type === 'SET_CART'){
    state = action.cart;
  } else if (action.type === 'DELETE_CART') {
    const lineItems = state.lineItems.filter(item => item.product.id !== action.id)
    state = {
      ...state,
      lineItems
    };
  } else if (action.type === 'UPDATE_QUALITY') {
    const lineItem = state.lineItems.find(item => item.product.id === action.id);
    lineItem.quantity += action.num;
    state = {
      ...state
    };
  }
  return state;
};

export const fetchCart = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/orders/cart', {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    const cart = [];
    for (let i = 0; i < 10; i++) {
      cart.push({
        product: {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          imageUrl: faker.image.business(),
        },
        quantity: faker.datatype.number(10)
      })
    }
    dispatch({ type: 'SET_CART', cart: {
        createdAt: "2022-08-15T15:10:19.454Z",
        id: 2,
        isCart: true,
        lineItems: cart,
        updatedAt: "2022-08-15T15:10:19.454Z",
        userId: 1,
      } || response.data });

  };
};

export const deleteCart = (id) => {
  return async(dispatch)=> {
    dispatch({ type: 'DELETE_CART', id});
  };
};

export const updateQuality = (id, num) => {
  return async(dispatch)=> {
    dispatch({ type: 'UPDATE_QUALITY', id, num});
  };
}


export default cart;
