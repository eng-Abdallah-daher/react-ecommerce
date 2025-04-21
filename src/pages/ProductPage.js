import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obj } from '../data/products'
import Cart from './cart';
import '../css/products_Page.css';
import '../css/cart.css';


const setCookie = (name, value, days) => {
    const stringValue = JSON.stringify(value);
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = `${name}=${stringValue}${expires}; path=/`;
};

const getCookie = (name) => {
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
function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}
export default function ProductPage() {


    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(getCookie('cartItems'));
    }, []);



    const addNewItem = (product) => {
        const currentCart = getCookie('cartItems');


        const img = images[0];

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
            const updatedCart = [...currentCart, newItem];
            setCookie('cartItems', updatedCart, 7);
            window.location.reload();
        }
    };

    const { id: routeId } = useParams();
    const qs = new URLSearchParams(window.location.search);
    const queryId = qs.get('id');
    const rawId = routeId ?? queryId;
    const index = parseInt(rawId, 10);


    const [swatchIdx, setSwatchIdx] = useState(0);
    const [qty, setQty] = useState(1);
    const [images, setImages] = useState([]);
    const [mainIdx, setMainIdx] = useState(0);
    const thumbRef = useRef();

    const product = Number.isInteger(index) ? obj.results[index] : undefined;

    useEffect(() => {
        if (product) {
            const imgs = [
                product.swatches[swatchIdx].img.src,
                ...Object.values(product.images)
            ];
            setImages(imgs);
            setMainIdx(0);
        }
    }, [product, swatchIdx]);

    const imgUrl = src => src;

    const onAdd = (item) => {
        addNewItem(item);
    };

    const [selected, setSelected] = useState(null);
    const [swname, setswname] = useState("black");
    const [search, setSearch] = useState('');
    const [suggest, setSuggest] = useState([]);
    const [showSuggest, setShowSuggest] = useState(false);
    const [mobileActive, setMobileActive] = useState(false);
    const [mobileContent, setMobileContent] = useState('menu');
    const [dropdown, setDropdown] = useState({ products: false, categories: false });


    const productsTriggerRef = useRef(null);
    const categoriesTriggerRef = useRef(null);

    const debounced = useRef(
        debounce(val => {
            if (!val) {

                setShowSuggest(false);
                return;
            }
            const f = obj.results
                .map((p, i) => ({ ...p, originalIndex: i }))
                .filter(p =>
                    p.productName.toLowerCase().includes(val.toLowerCase())
                );
            setSuggest(f);
            setShowSuggest(f.length > 0);
        }, 300)
    ).current;



    const handleSearchChange = e => {
        setSearch(e.target.value);
        debounced(e.target.value);
    };

    const handleSearchKey = e => {
        if (e.key === 'Enter') {
            if (!search) {


                setSelected(null);
            } else {

                const m = obj.results.findIndex(
                    p => p.productName.toLowerCase() === search.toLowerCase()
                );
                if (m !== -1) setSelected(m);
            }
            setShowSuggest(false);
        }
    };

    const chooseSuggest = idx => {
        window.location.href = `/products?id=${idx}`;
    };




    const changeMobileContent = category => setMobileContent(category);
    const mobileMenuItems = () => {
        switch (mobileContent) {
            case 'products':
                return [
                    <li key="back"><a href="#" onClick={() => changeMobileContent('menu')} tabIndex="0">&lt; Products</a></li>,
                    <hr key="hr1" />,
                    ['2.1', '2.2', '2.3'].map(k => (
                        <li key={k}>
                            <a href="#" onClick={() => changeMobileContent(k)} tabIndex="0">
                                {k} PAGE LINK HEADER
                            </a>
                        </li>
                    ))
                ];
            case 'categories':
                return [
                    <li key="backCate"><a href="#" onClick={() => changeMobileContent('menu')} tabIndex="0">&lt; Categories</a></li>,
                    <hr key="hrc" />,
                    ['3.1', '3.2', '3.3'].map(k => (
                        <li key={k}>
                            <a href="#" tabIndex="0">{k} CATEGORY LINK HEADER</a>
                        </li>
                    ))
                ];
            default:
                return [
                    <li key="h"><a href="/" tabIndex="0">Home</a></li>,
                    <li key="p"><a href="#" onClick={() => changeMobileContent('products')} tabIndex="0">Products &gt;</a></li>,
                    <li key="g"><a href="/goods" tabIndex="0">Goods</a></li>,
                    <li key="a"><a href="#" tabIndex="0">About</a></li>,
                    <li key="c"><a href="#" onClick={() => changeMobileContent('categories')} tabIndex="0">Categories ⌄</a></li>
                ];
        }
    };

    const activeDropdown = dropdown.products || dropdown.categories;
    useEffect(() => {
        if (product && product.swatches && product.swatches.length > 0) {
            setswname(product.swatches[swatchIdx].swatchName);
        }
    }, [product, swatchIdx]);
    useEffect(() => {
        if (activeDropdown) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeDropdown]);
    const [translateX, setTranslateX] = useState(0);


    const scrollThumb = (dir) => {
        const container = thumbRef.current;
        if (!container) return;

        const item = container.querySelector('.thumbnail');
        if (!item) return;

        const itemWidth = item.offsetWidth;
        let newTranslate = translateX + dir * -itemWidth;

        const maxShift = -(container.scrollWidth - container.parentElement.offsetWidth);
        if (newTranslate < maxShift) newTranslate = maxShift;
        if (newTranslate > 0) newTranslate = 0;

        container.style.transform = `translateX(${newTranslate}px)`;
        container.style.transition = 'transform 0.3s ease';

        setTranslateX(newTranslate);
    };


    if (!product) {
        return (
            <div style={{ padding: 20 }}>

                <h2>Product Not Found</h2>
                <p>We couldn’t find a product with ID “{rawId}”.</p>
            </div>
        );
    }

    return (
        <>
            <div
                className={activeDropdown ? 'dropdown-overlay active' : 'dropdown-overlay'}
                onClick={() => setDropdown({ products: false, categories: false })}
            />

            <div className="navbar">
                <div className="forlogos">
                    <div className="logo" tabIndex="0">MY SHOP</div>
                    <div>
                        <input
                            id="search"
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearchChange}
                            onFocus={() => {
                                if (!search) {
                                    setShowSuggest(false);
                                } else if (suggest.length > 0) {
                                    setShowSuggest(true);
                                }
                            }}
                            onKeyDown={handleSearchKey}
                            tabIndex="0"
                        />
                        <div
                            id="suggestion-container"
                            style={{ display: showSuggest ? 'block' : 'none' }}
                        >
                            {suggest.map((p, i) => (
                                <div
                                    key={i}
                                    className="suggestion"
                                    tabIndex="0"
                                    onMouseDown={() => chooseSuggest(p.originalIndex)}
                                    onKeyDown={e =>
                                        e.key === 'Enter' && chooseSuggest(p.originalIndex)
                                    }
                                >
                                    {p.productName}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="icons">
                        <i tabIndex="0">❤️</i>
                        <Cart cart={cart} setCart={setCart} />
                        <i tabIndex="0">👤</i>
                    </div>
                </div>


                <ul className="nav-links">
                    <li><Link to="/" tabIndex="0">Home</Link></li>

                    <li
                        style={{ marginTop: '10px' }}
                        ref={productsTriggerRef}
                        className="dropdown-trigger"
                        tabIndex="0"
                        onMouseEnter={() => setDropdown(d => ({ ...d, products: true }))}
                        onMouseLeave={() => setDropdown(d => ({ ...d, products: false }))}
                        onKeyDown={e => e.key === 'Enter' && setDropdown(d => ({ ...d, products: !d.products }))}
                    >
                        <span>
                            Products <span className="arrow" style={{
                                transform: dropdown.products ? 'rotate(180deg)' : 'rotate(0deg)',
                                marginTop: dropdown.products ? '10px' : '0px'
                            }}>⌄</span>
                        </span>
                        {dropdown.products && (
                            <div className="dropdown active">
                                {['2.1', '2.2', '2.3'].map(k => (
                                    <div key={k} className="column">
                                        <h3 tabIndex="0">{k} PAGE LINK HEADER</h3>
                                        {[1, 2, 3].map(n => (
                                            <Link key={n} to={`/products/${k}/${n}`} tabIndex="0">{`${k}.${n}`}</Link>
                                        ))}
                                    </div>
                                ))}
                                <a
                                    style={{ position: 'absolute', opacity: 0, height: 0, width: 0 }}
                                    tabIndex="0"
                                    onKeyDown={e => e.key === 'Tab' && (e.preventDefault(), setDropdown({ products: false, categories: false }), productsTriggerRef.current.focus())}
                                />
                            </div>
                        )}
                    </li>

                    <li><Link to="/goods" tabIndex="0">Goods</Link></li>
                    <li><Link to="/about" tabIndex="0">About</Link></li>
                    <li><Link to="/contact" tabIndex="0">Contact</Link></li>

                    <li
                        style={{ marginTop: '10px' }}
                        ref={categoriesTriggerRef}
                        className="dropdown-trigger"
                        tabIndex="0"
                        onMouseEnter={() => setDropdown(d => ({ ...d, categories: true }))}
                        onMouseLeave={() => setDropdown(d => ({ ...d, categories: false }))}
                        onKeyDown={e => e.key === 'Enter' && setDropdown(d => ({ ...d, categories: !d.categories }))}
                    >
                        <span>
                            Categories <span className="arrow" style={{
                                transform: dropdown.categories ? 'rotate(180deg)' : 'rotate(0deg)',
                                marginTop: dropdown.categories ? '10px' : '0px'
                            }}>⌄</span>
                        </span>
                        {dropdown.categories && (
                            <div className="dropdown active">
                                {['3.1', '3.2', '3.3'].map(k => (
                                    <div key={k} className="column">
                                        <h3 tabIndex="0">{`${k} CATEGORY LINK HEADER`}</h3>
                                        {[1, 2, 3].map(n => (
                                            <Link key={n} to={`/categories/${k}/${n}`} tabIndex="0">{`${k}.${n}`}</Link>
                                        ))}
                                    </div>
                                ))}
                                <a
                                    style={{ position: 'absolute', opacity: 0, height: 0, width: 0 }}
                                    tabIndex="0"
                                    onKeyDown={e => e.key === 'Tab' && (e.preventDefault(), setDropdown({ products: false, categories: false }), categoriesTriggerRef.current.focus())}
                                />
                            </div>
                        )}
                    </li>
                </ul>

            </div>

            <div className="navbar-top-small-screen navbar-top">
                <div className='navbar-top'>
                    <div className="logo" tabIndex="0">MY SHOP</div>
                    <div className="icons">
                        <i tabIndex="0">❤️</i>
                        <i tabIndex="0"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    window.location.href = '/cart'
                                }
                            }}
                            onClick={() => {
                                window.location.href = '/cart'
                            }}>🛒</i>
                        <i tabIndex="0">👤</i>
                    </div>
                    <div
                        className="menu-icon"
                        tabIndex="0"
                        onClick={() => setMobileActive(v => !v)}
                        onKeyDown={e => e.key === 'Enter' && setMobileActive(v => !v)}
                    >
                        ☰
                    </div>
                </div>
                <input
                    id="search"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={handleSearchChange}
                    onFocus={() => {
                        if (!search) {
                            setShowSuggest(false);
                        } else if (suggest.length > 0) {
                            setShowSuggest(true);
                        }
                    }}
                    onKeyDown={handleSearchKey}
                    tabIndex="0"
                />
                <div
                    id="suggestion-container"
                    className="suggestion-container"
                    style={{ display: showSuggest ? 'block' : 'none' }}
                >
                    {suggest.map((p, i) => (
                        <div
                            key={i}
                            className="suggestion"
                            tabIndex="0"
                            onMouseDown={() => chooseSuggest(p.originalIndex)}
                            onKeyDown={e =>
                                e.key === 'Enter' && chooseSuggest(p.originalIndex)
                            }
                        >
                            {p.productName}
                        </div>
                    ))}
                </div>
            </div>
            <div className={mobileActive ? 'navbar-bottom active' : 'navbar-bottom'} id="menu-list">
                <ul>{mobileMenuItems()}</ul>
            </div>
            <div className="container" id="cont">
                <div className="imageedit" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                        className="forleftarrow"
                        id="righta"
                        onClick={() => mainIdx > 0 && setMainIdx(i => i - 1)}
                        style={{ left: '55px' }}
                        aria-label="scroll main image to left"
                    >
                        &lt;
                    </button>

                    <div className="image-section">
                        <div className="mmm">
                            <img
                                id="main-img"
                                src={imgUrl(images[mainIdx] || product.productImg)}
                                alt="Product Image"
                                tabIndex="0"
                            />
                        </div>

                        <div className="thumbnail-container" id="thumbnail-container">
                            <button
                                className="lefta2"
                                id="lefta2"
                                onClick={() => scrollThumb(-1)}
                                aria-label="scroll thumbnails images to left"
                            >
                                &lt;
                            </button>
                            <div className="thumbnails-wrapper">
                                <div className="thumbnails"
                                    id="thumbnails"
                                    ref={thumbRef}
                                    style={{ display: 'flex', transition: 'transform 0.3s ease' }}

                                >
                                    {images.map((src, i) => (
                                        <img
                                            key={i}
                                            className={`thumbnail ${i === mainIdx ? 'selected' : ''}`}
                                            src={imgUrl(src)}
                                            alt="Thumb"
                                            onClick={() => setMainIdx(i)}
                                            tabIndex="0"
                                        />
                                    ))}
                                </div>
                            </div>
                            <button
                                className="righta2"
                                id="righta2"
                                onClick={() => scrollThumb(1)}
                                aria-label="scroll thumbnails images to right"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>

                    <button
                        className="forleftarrow"
                        id="lefta"
                        onClick={() => mainIdx < images.length - 1 && setMainIdx(i => i + 1)}
                        aria-label="scroll main image to right"
                    >
                        &gt;
                    </button>
                </div>

                <div className="details-section">
                    <div style={{ display: 'flex', alignItems: 'center', height: '200px' }}></div>

                    <div className="det">
                        <div>
                            <div className="tocent">
                                <div>
                                    <h2 id="product-name" tabIndex="0">{product.productName}</h2>
                                    <p className="price" id="product-price" tabIndex="0">${product.productPriceFormatted}</p>
                                    <p className="price" id="price" tabIndex="0">{product.productName} {swname} Selected</p>
                                </div>
                            </div>

                            <div className="swatches" id="swatches-container">
                                {

                                    product.swatches.map((sw, i) => (
                                        <img
                                            key={i}
                                            className={`swatch ${i === swatchIdx ? 'selected' : ''}`}
                                            src={imgUrl(sw.img.src)}
                                            alt={sw.swatchName}
                                            tabIndex="0"
                                            style={{
                                                border:
                                                    i === swatchIdx
                                                        ? sw.swatchName.toLowerCase() === "white"
                                                            ? "2px solid black"
                                                            : `2px solid ${sw.swatchName}`
                                                        : "none"
                                            }}

                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    setSwatchIdx(i);
                                                    const swatches = document.querySelectorAll('.swatches .swatch');
                                                    swatches.forEach((swatch, index) => {
                                                        swatch.style.border = index === i ? `2px solid ${sw.swatchName}` : 'none';
                                                    });
                                                }
                                            }}
                                            onClick={() => {
                                                setSwatchIdx(i);

                                                const swatches = document.querySelectorAll('.swatches .swatch');
                                                swatches.forEach((swatch, index) => {
                                                    swatch.style.border = index === i ? `2px solid ${sw.swatchName}` : 'none';
                                                });



                                            }

                                            }
                                        />
                                    ))}
                            </div>

                            <div className="cart-container-product" style={{ display: 'flex' }}>
                                <div className="quantity-container">
                                    <button onClick={() => setQty(q => Math.max(1, q - 1))} title="decrement" aria-label="decrement the quantity of the product">-</button>
                                    <span id="quantity" tabIndex="0">{qty}</span>
                                    <button onClick={() => setQty(q => q + 1)} title="increment" aria-label="increment the quantity of the product">+</button>
                                </div>
                                <button
                                    className="add-to-cart"
                                    id="addtocart"
                                    onClick={() => onAdd(product)}
                                    title="ADD TO CART"
                                >
                                    ADD TO CART
                                </button>

                            </div>

                            <div className="add-to-list" title="ADD TO LIST" tabIndex="0">♥ ADD TO LIST</div>

                            <div className="details">
                                {[
                                    "PRODUCTS DETAILS",
                                    "FREE SHIPPING IN THE CONTIGUOUS US",
                                    "FREE RETURNS WITHIN 30 DAYS",
                                    "QUALITY CERTIFICATIONS"
                                ].map((text, index) => (
                                    <React.Fragment key={index}>
                                        <div
                                            style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}
                                            title={text}
                                            tabIndex="0"
                                            aria-label={text}
                                        >
                                            <p>{text}</p>
                                            <p>+</p>
                                        </div>
                                        <hr />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', height: '200px' }}></div>
                </div>
            </div>

        </>
    );

}
