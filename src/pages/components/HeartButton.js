import React, { useState, useEffect } from 'react';
import { addToWishlist, removeFromWishlist, getWishlist } from '../utils/WishlistFunctions';
import { obj } from '../../data/products';
import ConfirmDialog from './ConfirmDialog';

const HeartButton = ({ productIndex }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null); 
    useEffect(() => {
        const wishlist = getWishlist();
        setIsWishlisted(wishlist.includes(productIndex));
    }, [productIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            const wishlist = getWishlist();
            setIsWishlisted(wishlist.includes(productIndex));
        }, 1000);

        return () => clearInterval(interval);
    }, [productIndex]);

    const openConfirmDialog = (action) => {
        setConfirmAction(() => action);
        setShowConfirm(true);
    };

    const confirm = () => {
        if (confirmAction) {
            confirmAction();
        }
        setShowConfirm(false);
    };

    const cancel = () => {
        setShowConfirm(false);
    };

    const toggleWishlist = () => {
        if (isWishlisted) {
            openConfirmDialog(() => {
                removeFromWishlist(productIndex);
                setIsWishlisted(false);
            });
        } else {
            openConfirmDialog(() => {
                addToWishlist(productIndex);
                setIsWishlisted(true);
            });
        }
    };

    return (
        <>
            <button
                onClick={toggleWishlist}
                aria-label="wishlist toggle"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}
            >
                {isWishlisted ? '❤️' : '🤍'}
            </button>

            <ConfirmDialog show={showConfirm} onCancel={cancel} onConfirm={confirm} message={isWishlisted ? `Do you want to remove the item ${obj.results[productIndex].productName} from the wishlist? ` : `Do you want to add the item ${obj.results[productIndex].productName} to the wishlist? `} title={isWishlisted ? 'Remove from wishlist?' : 'Add to wishlist?'}/>
        </>
    );
};

export default HeartButton;
