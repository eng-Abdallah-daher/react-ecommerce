import React, { useEffect, useState } from 'react';
import '../css/cart_Page.css'
import {deleteItemFromCart} from './utils/Functions'
import { setCookie, getCookie } from './utils/Functions';
const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getCookie('cartItems');
        setCart(savedCart);
    }, []);



    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2 tabIndex="0">YOUR CART (<span>{cart.length}</span>)</h2>
            <div className="cart-items-wrapper">
                {cart.map((item, index) => (
                    <div className="cart-item" key={index}>
                        <div className="m">
                            <div style={{ display: 'flex' }}>
                                <img src={item.img} alt={`${item.swatch} ${item.name}`} tabIndex="0" />
                                <div className="data">
                                    <div tabIndex="0">{item.name}</div>
                                    <div tabIndex="0">{item.swatch}</div>
                                    <div tabIndex="0">${item.price}</div>
                                    <div tabIndex="0">Quantity: {item.quantity}</div>
                                </div>
                            </div>
                            <button
                                onClick={
                                    () => {
                                        deleteItemFromCart(item);
                                        setCart(cart.filter((_, i) => i !== index));
                                        
                                    }
                                }
                                aria-label="remove the item from the cart"
                            >
                                X
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-footer">
                <span tabIndex="0">Estimated Total</span>
                <span id="totalAmount" tabIndex="0">{total.toFixed(2)}$</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}><button className="checkout-btn" onClick={
                () => {
                    setCookie('cartItems', [], 7);
                    setCart([]);
                    
                }
            }>Checkout</button></div>
            <div style={{ display: 'flex', justifyContent: 'center' }}> <button
                className="checkout-btn"
                onClick={() => (window.history.back())}
            >
                Back to Home
            </button>
            </div>
        </div>
    );
};

export default CartPage;
