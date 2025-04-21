import React, { useState, useEffect } from 'react';


function setCookie(name, value, days) {
 
  const stringValue = JSON.stringify(value);
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = `${name}=${stringValue}${expires}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let c of cookies) {
    const [key, val] = c.split('=');
    if (key === name) {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
  }
  return [];
}

const Cart = () => {
  const [cart, setCart] = useState([]);
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

  useEffect(() => {
    const storedCart = getCookie('cartItems');
    setCart(storedCart);
  }, []);





  const deleteItemFromCart = (itemToRemove) => {
    const currentCart = getCookie('cartItems');

    const updatedCart = currentCart.filter(item =>
      !(item.name === itemToRemove.name && item.img === itemToRemove.img)
    );

    setCookie('cartItems', updatedCart, 7);
    window.location.reload();
  };

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
              <div key={index} className="cart-item">
                <div style={{ height: '90px' }}>
                  <img src={item.img} alt={item.name} tabIndex="0" />
                </div>
                <div style={{ flex: 7 }}>
                  <strong tabIndex="0">{item.name}</strong><br />
                  <span tabIndex="0">Swatch: {item.swatch}</span><br />
                  <span tabIndex="0">Quantity: {item.quantity}</span><br />
                  <span tabIndex="0">Total: {item.price * item.quantity}$</span>
                </div>
                <button onClick={() => openConfirmDialog(item)} aria-label={`remove ${item.name} ${item.swatch} from the cart`}>X</button>
              </div>
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
              document.cookie = `cartItems=${JSON.stringify([])}; path=/; expires=${new Date(Date.now() + 7 * 86400000).toUTCString()}`;
              window.location.reload(); 
            }}
          >
            Checkout
          </button>

</div>
        <div className='center'>
        <button className="checkout-btn" onClick={() => setShowCart(false)}>Close</button>
        </div> </div>

      <div
        className="confirm-dialog"
        style={{ display: showConfirm ? 'block' : 'none' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div id="remove" tabIndex="0">Remove Item?</div>
          <div id="x" tabIndex="0" aria-label="Close the dialog" onClick={() => setShowConfirm(false)}>X</div>
        </div>
        <p>Are you sure you want to remove the following product from the cart?</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="no" onClick={() => setShowConfirm(false)}>Cancel</button>
          <button className="yes" onClick={confirmRemove} id="yes">Yes</button>
        </div>
      </div>

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
