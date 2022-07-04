import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/ProductList/ProductList';
import { commerce } from './lib/ecommerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cart from './components/Cart/Cart';

// const products = [
//   {id: 1, name: "Iphone 1", price: "$15", description:"iphone", image:""},
//   {id: 2, name: "Iphone 2", price: "$15", description:"iphone", image:""},
//   {id: 3, name: "Iphone 3", price: "$15", description:"iphone", image:""},
//   {id: 4, name: "Iphone 4", price: "$15", description:"iphone", image:""},
//   {id: 5, name: "Iphone 5", price: "$15", description:"iphone", image:""}
// ];
function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    console.log(cart);
    setCart(cart);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    
    setCart(item.cart);
  };
  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() =>{
    document.title = "KhacVQ1 Final Mock";
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <ProductList products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          <Route path="/checkout" exact>
            {/* <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
