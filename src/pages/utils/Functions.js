

export const getCookie = (name) => {
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

export const setCookie = (name, value, days) => {
    const stringValue = JSON.stringify(value);
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = `${name}=${stringValue}${expires}; path=/`;
};
export function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}






export var cart = getCookie('cartItems');

export function updateCart(newCart) {
    cart = newCart;
    setCookie('cartItems', cart, 7);
}
export const addNewItem = (product,image,qty,swname) => {
        const currentCart = getCookie('cartItems');


    const img = image;

        const newItem = {
            productID: product.productID,
            name: product.productName,
            img: img,
            swatch: swname,
            price: product.productPrice,
            quantity: qty,
        };

        const exists = currentCart.find(item =>
            item.name === product.productName && item.img === img
        );

        if (exists) {
            alert("This item is already in the cart.");
        } else {
             cart = [...currentCart, newItem];
            setCookie('cartItems', cart, 7);
           
            
        }
    };
export function deleteItemFromCart(itemToRemove) {
    const updatedCart = cart.filter(item =>
        !(item.name === itemToRemove.name && item.img === itemToRemove.img)
    );

    updateCart(updatedCart);
}
