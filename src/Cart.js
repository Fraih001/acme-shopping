import React from 'react';
import { connect } from 'react-redux';

const Cart = ({ cart })=> {

  return (
    <ul>
    {
      cart.lineItems.map( lineItem => {
        return (
          <li key={ lineItem.id }>
            { lineItem.product.name } { lineItem.quantity }
          </li>
            )
      })
    }
    </ul>
  );
};

export default connect(state => state)(Cart);
