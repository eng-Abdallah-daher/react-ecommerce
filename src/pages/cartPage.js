import React, { useEffect, useState } from 'react';
import '../css/cart_Page.css'


const getCookie = name => {
    const cookieArr = document.cookie.split('; ');
    for (let cookie of cookieArr) {
        const [key, val] = cookie.split('=');
        if (key === name) {
            try {
                return JSON.parse(val);
            } catch (e) {
                return [];
            }
        }
    }
    return [];
};

const setCookie = (name, value, days) => {
    const jsonStr = JSON.stringify(value);
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${jsonStr}${expires}; path=/`;
};

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getCookie('cartItems');
        setCart(savedCart);
    }, []);

    const deleteItem = (itemToDelete) => {
        const updated = cart.filter(
            item => !(item.name === itemToDelete.name && item.img === itemToDelete.img)
        );
        setCookie('cartItems', updated, 7);
        setCart(updated);
    };

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
                                onClick={() => deleteItem(item)}
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
                    document.cookie = `cartItems=${JSON.stringify([])}; path=/; expires=${new Date(Date.now() + 7 * 86400000).toUTCString()}`;
                    window.location.reload();
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
