import React, { useState, useEffect } from 'react';
import { setCookie, deleteItemFromCart } from './utils/Functions';
import CartItem from './components/cartItem';
import { cart, updateCart } from './utils/Functions'
import ConfirmDialog from './components/ConfirmDialog';

const Cart = () => {
  
  const [showCart, setShowCart] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  


  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCart]);







  const openConfirmDialog = index => {
    setItemToRemove(index);
    setShowConfirm(true);
    setShowCart(false);
  };

  const confirmRemove = () => {
    console.log(itemToRemove);
    if (itemToRemove !== null) {
      deleteItemFromCart(itemToRemove);
    }
    setShowConfirm(false);
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let show = true;

  return (
    <>
      <div
        className="cart-overlay"
        onClick={() => { setShowCart(false); setShowConfirm(false); }}
        style={{ display: showCart || showConfirm ? 'block' : 'none' }}
      />
      <div
        className="cart-popup"
        onMouseLeave={() => setShowCart(false)}
        style={{ display: showCart ? 'flex' : 'none' }}
      >
        <div className="cart-arrow" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 tabIndex="0">YOUR CART ({cart.length})</h2>
          <a href="/cart" style={{ textDecoration: 'none', color: 'black' }}>VIEW CART</a>
        </div>

        <div className="cart-items-wrapper">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <CartItem key={index} index={index} item={item} openConfirmDialog={openConfirmDialog} />
            ))
          ) : (
            <p>No items in cart</p>
          )}
        </div>

        <div className="cart-footer">
          <span tabIndex="0">Estimated Total</span>
          <span tabIndex="0">{totalAmount}$</span>
        </div>
<div className='center'>

          <button
            className="checkout-btn"
            onClick={() => {
              setCookie('cartItems', [], 7);
setShowCart(false);
              updateCart([]);
            }}
          >
            Checkout
          </button>

</div>
        <div className='center'>
        <button className="checkout-btn" onClick={() => setShowCart(false)}>Close</button>
        </div> </div>

      <ConfirmDialog show={showConfirm} onCancel={() => setShowConfirm(false)} onConfirm={confirmRemove} message={`Are you sure you want to remove the following product from the cart?`} title={'Remove Item?'}/>


      <i
        id="cart-icon"
        title="cart"
        onMouseEnter={() => setShowCart(true)}
        tabIndex="0"
        style={{ cursor: 'pointer' }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setShowCart(show);
            show = !show;
          }
        }}
      >🛒</i>
    </>
  );
};

export default Cart;
