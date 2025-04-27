export default function WishlistItem({ item, openConfirmDialog }) {
    if (!item) return null;

  

    return (
        <div className="cart-item">
            <div style={{ height: '90px' }}>
                <img src={item.productImg || 'default-image.png'} alt={item.productName} tabIndex="0" />
            </div>
            <div style={{ flex: 7 }}>
                <strong tabIndex="0">{item.productName}</strong><br />
                <span tabIndex="0">Price: {item.productPrice}</span><br />
                <span tabIndex="0">productPriceFormatted: {item.productPriceFormatted}</span><br />

            </div>
            <button onClick={() => openConfirmDialog(item.index)} aria-label={`remove ${item.productName} from the wishlist`}>X</button>
        </div>
    );
}
