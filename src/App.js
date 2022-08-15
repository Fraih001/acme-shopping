import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchCart, exchangeToken, logout } from './store';
import { Link, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Cart from './Cart';
import igdb from 'igdb-api-node';

const client = igdb('71n9jotfv4acipnlmuxyy6btvrik4u', '9y3fegv67pshqedo7s191euhphaztj');

class App extends React.Component{
  constructor(){
    super()
      this.state = {
        games: [],      
    }
  }
  componentDidMount(){
    this.props.fetchProducts();
    this.props.exchangeToken();
    this.generateVideoGames();
  }

  componentDidUpdate(prevProps){
    if(!prevProps.auth.id && this.props.auth.id){
      this.props.fetchCart();
    }
  }

  // api test query - 10 Zelda games + their covers/summary/screenshots
  async generateVideoGames (){
    const zeldaGames = await client
      .fields('name,summary,cover.url,screenshots.*')
      .limit(10)
      .search('zelda')
      .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
      // console.log(zeldaGames.data)
    this.setState({games: zeldaGames.data})
  }

  render(){
    const { auth, logout, cart, product } = this.props;
    return (
      <main>

        <h1>Grace Shopper</h1>

        {
          auth.id ? <button onClick={ logout }>Logout { auth.username }</button>: <SignIn />
        }

        {
          auth.id ? <Link to='/cart'>Cart ({cart.lineItems.length})</Link>: null
        }

        {
          auth.id ? (
            <Fragment>
              <Route path='/cart' component={ Cart } />
            </Fragment>
          ): null 
        }

        {
          auth.id ? (
            <ul>
          { product.map(product=>{
            {/* console.log(game.screenshots[0].url) */}
            return (
              <li key={product.id}>
                {product.name} <img src={product.imageUrl}/>
              </li>
            )
          })}
        </ul>): null
        }
       
      </main>
    );

  }
}
const mapDispatch = (dispatch)=> {
  return {
    exchangeToken: ()=> dispatch(exchangeToken()),
    logout: ()=> dispatch(logout()),
    fetchCart: ()=> dispatch(fetchCart()),
    fetchProducts: ()=> dispatch(fetchProducts()),

  };
};
const mapStateToProps = ({auth, product, cart}) => {
// product = product.filter(product => product.rating > 90);
  return {
    auth,
    product,
    cart
  }
};
export default connect(mapStateToProps, mapDispatch)(App);
