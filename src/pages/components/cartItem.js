
export default function CartItem({ index, item, openConfirmDialog }) {

    return (
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
    );
};


