import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../utils/WishlistFunctions";
import ConfirmDialog from "./ConfirmDialog";
import CartPageItem from "./cartPageItem";
import { obj } from "../../data/products";

export default function WishlistInfo() {
   const [wishlist, setWishlist] = useState([]);
       const [showConfirm, setShowConfirm] = useState(false);
   
       const [itemToRemove, setItemToRemove] = useState(null);
        const confirmRemove = () => {
            
                  removeFromWishlist(itemToRemove.index);
                  setWishlist(prev => prev.filter(i => i.index !== itemToRemove.index));
              
              setShowConfirm(false);
          };
      
          const cancelRemove = () => {
              setShowConfirm(false);
          };
       const openConfirmDialog = (item) => {
           setItemToRemove(item);
           
           setShowConfirm(true);
       };
    useEffect(() => {
        const savedWishlistIndexes = getWishlist();
        const fullProducts = savedWishlistIndexes.map(index => obj.results[index]);
        setWishlist(fullProducts);
    }, []);

    return (
        <div className="cart-items-wrapper">

            <ConfirmDialog show={showConfirm} onCancel={cancelRemove} onConfirm={confirmRemove} message={'Are you sure you want to remove the following product from your wishlist?'}
                title={'Remove Item?'}
            />

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
    );
}
