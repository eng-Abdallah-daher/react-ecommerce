import React, { useState, useEffect } from 'react';
import { getWishlist, removeFromWishlist, clearWishlist, falsing } from '../utils/WishlistFunctions';
import WishlistItem from './WishlistItem';
import { obj } from '../../data/products';
import ConfirmDialog from './ConfirmDialog';

export const Wishlist = () => {
    const [showWishlist, setShowWishlist] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [isClearAll, setIsClearAll] = useState(false); 
    const [wishlistItems, setWishlistItems] = useState([]);

    function getalllist() {
        const savedWishlistIndexes = getWishlist();
        const updatedWishlistItems = savedWishlistIndexes.map(index => obj.results[index]);
        setWishlistItems(updatedWishlistItems);
    }

    useEffect(() => {
        if (showWishlist) {
            getalllist();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showWishlist]);

    const openConfirmDialog = (index) => {
        setItemToRemove(index);
        setIsClearAll(false); 
        setShowConfirm(true);
        setShowWishlist(false);
    };

    const openClearAllConfirmDialog = () => {
        setIsClearAll(true); 
        setShowConfirm(true);
        setShowWishlist(false);
    };

    const confirmAction = () => {
        if (isClearAll) {
            
            clearWishlist();
            setWishlistItems([]);
        } else if (itemToRemove !== null) {
            
            falsing();
            removeFromWishlist(itemToRemove);
            getalllist();
        }
        setShowConfirm(false);
    };

    const cancelConfirm = () => {
        setShowConfirm(false);
    };

    return (
        <>
            <div
                className={`wishlist-overlay ${showWishlist ? 'active' : ''}`}
                onClick={() => { setShowWishlist(false); setShowConfirm(false); }}
            />

            <div
                style={{ height: 'fit-content' }}
                className={`wishlist-popup ${showWishlist ? 'active' : ''}`}
                onMouseLeave={() => setShowWishlist(false)}
            >
                <div className="cart-arrow" style={{ right: '39%' }}></div>
                <div className="wishlist-arrow" />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2 tabIndex="0">YOUR WISHLIST ({wishlistItems.length})</h2>
                    <a href="/wishlist" style={{ textDecoration: 'none', color: 'black' }}>VIEW WISHLIST</a>
                </div>

                <div className="wishlist-items-wrapper" style={{ height: '330px', overflowY: 'auto' }}>
                    {
                        wishlistItems.length > 0 ? (
                            wishlistItems.map((item, index) => (
                                <WishlistItem
                                    key={index}
                                    item={item}
                                    openConfirmDialog={openConfirmDialog}
                                />
                            ))
                        ) : (
                            <p>No items in wishlist</p>
                        )
                    }
                </div>

                <div className="center">
                    <button className="checkout-btn" onClick={openClearAllConfirmDialog}>
                        Clear Wishlist
                    </button>
                </div>

                <div className="center">
                    <button className="checkout-btn" onClick={() => setShowWishlist(false)}>
                        Close
                    </button>
                </div>
            </div>

            <ConfirmDialog
                show={showConfirm}
                title={isClearAll ? "Clear Wishlist?" : "Remove Item?"}
                message={isClearAll
                    ? "Are you sure you want to clear all items from your wishlist?"
                    : "Are you sure you want to remove this product from the wishlist?"}
                onCancel={cancelConfirm}
                onConfirm={confirmAction}
            />

            <i
                id="wishlist-icon"
                title="wishlist"
                onMouseEnter={() => setShowWishlist(true)}
                tabIndex="0"
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        setShowWishlist(prev => !prev);
                    }
                }}
            >
                ❤️
            </i>
        </>
    );
};

export default Wishlist;
