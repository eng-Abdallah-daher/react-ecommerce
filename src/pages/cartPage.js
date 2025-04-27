import React, { useEffect, useState } from 'react';
import '../css/cart_Page.css';
import { deleteItemFromCart, setCookie, getCookie } from './utils/Functions';
import { addToWishlist, getWishlist } from './utils/WishlistFunctions';
import { obj } from '../data/products';
import ConfirmDialog from './components/ConfirmDialog';


const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [itemToSave, setItemToSave] = useState(null); 

    useEffect(() => {
        const savedCart = getCookie('cartItems');
        setCart(savedCart);
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSaveForLater = (item) => {
        setItemToSave(item);
        setShowConfirm(true); 
    };

    const confirmSave = () => {
        if (itemToSave) {
            const index = obj.results.findIndex((product) => product.productID === itemToSave.productID);
            const items = getWishlist();
            if (items.includes(index)) {
                alert("Already in wishlist");
            } else {
                addToWishlist(index);
                alert("Added to wishlist");
            }
        }
        setShowConfirm(false);
        setItemToSave(null);
    };

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
                                    <button
                                        onClick={() => handleSaveForLater(item)}
                                        className='save'
                                        style={{
                                            backgroundColor: '#002233',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Save for Later
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    deleteItemFromCart(item);
                                    setCart(cart.filter((_, i) => i !== index));
                                }}
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

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    className="checkout-btn"
                    onClick={() => {
                        setCookie('cartItems', [], 7);
                        setCart([]);
                    }}
                >
                    Checkout
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    className="checkout-btn"
                    onClick={() => (window.history.back())}
                >
                    Back to Home
                </button>
            </div>
            <ConfirmDialog
                show={showConfirm}
                title="Save to Wishlist?"
                message="Are you sure you want to save this item to your wishlist?"
                onCancel={() => { setShowConfirm(false); setItemToSave(null); }}
                onConfirm={confirmSave}
            />
        </div>
    );
};

export default CartPage;
