import React from 'react';
import { connect } from 'react-redux';
import './Cart.css';
import { Link } from 'react-router-dom'
import { deleteCart, updateQuality } from './store'

const Cart = ({ cart, deleteCart, updateQuality })=> {
  return (
    <div className="cart-container">
      <ul className="cart-list">
      {
        cart.lineItems.map( lineItem => {
          return (
            <li key={ lineItem.id } className="cart-item">
              <img className="cart-image" src={lineItem.product.imageUrl} />
              <div>
                <div className="cart-name">{ lineItem.product.name }</div>
                <div className="cart-desc">{ lineItem.product.description }</div>
                <div className="cart-quantity">
                  <span className="quantity-minus" onClick={() => updateQuality(lineItem.product.id, -1)}>-</span>
                  <span className="quantity-num">{ lineItem.quantity }</span>
                  <span className="quantity-plus" onClick={() => updateQuality(lineItem.product.id, 1)}>+</span>
                </div>
                <div className="cart-delete" onClick={() => deleteCart(lineItem.product.id)}>delete</div>
              </div>
            </li>
              )
        })
      }
      </ul>
      <div>
        <Link to="/buy">Buy</Link>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch)=> {
  return {
    deleteCart: (id)=> dispatch(deleteCart(id)),
    updateQuality: (id, num)=> dispatch(updateQuality(id, num)),
  };
};

export default connect(state => state, mapDispatch)(Cart);
