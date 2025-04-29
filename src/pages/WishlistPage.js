import React, { useState, useEffect } from 'react';
import '../css/cart_Page.css';
import { obj } from '../data/products';
import { getWishlist, removeFromWishlist, clearWishlist } from './utils/WishlistFunctions';
import ConfirmDialog from './components/ConfirmDialog';
import CartPageItem from './components/cartPageItem';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [isClearingAll, setIsClearingAll] = useState(false);

    useEffect(() => {
        const savedWishlistIndexes = getWishlist();
        const fullProducts = savedWishlistIndexes.map(index => obj.results[index]);
        setWishlist(fullProducts);
    }, []);

    const openConfirmDialog = (item, isClearAll = false) => {
        setItemToRemove(item);
        setIsClearingAll(isClearAll);
        setShowConfirm(true);
    };

    const confirmRemove = () => {
        if (isClearingAll) {
            clearWishlist();
            setWishlist([]);
        } else if (itemToRemove !== null) {
            removeFromWishlist(itemToRemove.index);
            setWishlist(prev => prev.filter(i => i.index !== itemToRemove.index));
        }
        setShowConfirm(false);
    };

    const cancelRemove = () => {
        setShowConfirm(false);
    };

    return (
        <div className="cart-container">
            <h2 tabIndex="0">YOUR WISHLIST (<span>{wishlist.length}</span>)</h2>

            <div className="cart-items-wrapper">
                {wishlist.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Your wishlist is empty.</div>
                ) : (
                    wishlist.map((item, index) => (

                        <CartPageItem
                            key={index}
                            item={item}
                            openConfirmDialog={openConfirmDialog}
                        />
                    )
                )
                )}
            </div>

            {wishlist.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <button className="checkout-btn" onClick={() => openConfirmDialog(null, true)}>
                        Remove All
                    </button>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <button className="checkout-btn" onClick={() => window.history.back()}>
                    Back to Home
                </button>
            </div>

            <ConfirmDialog show={showConfirm} onCancel={cancelRemove} onConfirm={confirmRemove} message={isClearingAll
                ? 'Are you sure you want to remove all items from the wishlist?'
                : 'Are you sure you want to remove the following product from your wishlist?'} 
                title={isClearingAll ? 'Clear Wishlist?' : 'Remove Item?'}
                />

          
         
        </div>
    );
};

export default WishlistPage;
