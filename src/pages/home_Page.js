
import React, { useState, useEffect, useRef } from 'react';
import Cart from './cart';
import { obj } from '../data/products';
import '../css/home_Page.css';
import '../css/products_Page.css';
import '../css/cart.css';
import { Link } from 'react-router-dom';

function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

const HomePage = () => {
    const [filtered, setFiltered] = useState([]);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState('');
    const [suggest, setSuggest] = useState([]);
    const [showSuggest, setShowSuggest] = useState(false);
    const [mobileActive, setMobileActive] = useState(false);
    const [mobileContent, setMobileContent] = useState('menu');
    const [dropdown, setDropdown] = useState({ products: false, categories: false });
    const [swatchSel, setSwatchSel] = useState({});

    const productsTriggerRef = useRef(null);
    const categoriesTriggerRef = useRef(null);
    const activeDropdown = dropdown.products || dropdown.categories;
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
    const debounced = useRef(
        debounce(val => {
            if (!val) {
                setFiltered(
                    obj.results.map((p, i) => ({ ...p, originalIndex: i }))
                );
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

    useEffect(() => {
        setFiltered(
            obj.results.map((p, i) => ({ ...p, originalIndex: i }))
        );
    }, []);

    const handleSearchChange = e => {
        setSearch(e.target.value);
        debounced(e.target.value);
    };

    const handleSearchKey = e => {
        if (e.key === 'Enter') {
            if (!search) {

                setFiltered(
                    obj.results.map((p, i) => ({ ...p, originalIndex: i }))
                );
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
        setSelected(idx);
        setShowSuggest(false);
    };

    const resetProducts = () => {
        setSelected(null);
        setFiltered(
            obj.results.map((p, i) => ({ ...p, originalIndex: i }))
        );
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
                    <li key="h"><a href="/" onClick={resetProducts} tabIndex="0">Home</a></li>,
                    <li key="p"><a href="#" onClick={() => changeMobileContent('products')} tabIndex="0">Products &gt;</a></li>,
                    <li key="g"><a href="/goods" tabIndex="0">Goods</a></li>,
                    <li key="a"><a href="#" tabIndex="0">About</a></li>,
                    <li key="c"><a href="#" onClick={() => changeMobileContent('categories')} tabIndex="0">Categories ⌄</a></li>
                ];
        }
    };



    return (
        <>
            { }
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
                                    setFiltered(
                                        obj.results.map((p, i) => ({ ...p, originalIndex: i }))
                                    );
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
                        <Cart />
                        <i tabIndex="0">👤</i>
                    </div>
                </div>

                <ul className="nav-links">
                    <li><a href="/" onClick={resetProducts} tabIndex="0">Home</a></li>
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
                                            <a key={n} href="#" tabIndex="0">{`${k}.${n}`}</a>
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
                    <li><a href="/goods" tabIndex="0">Goods</a></li>
                    <li><a href="#" tabIndex="0">About</a></li>
                    <li><a href="#" tabIndex="0">Contact</a></li>
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
                                            <a key={n} href="#" tabIndex="0">{`${k}.${n}`}</a>
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

            <div className="container">
                <aside className="filters">
                    <h2 tabIndex="0">Filters</h2>
                    <ul>
                        <li tabIndex="0">Type <span>+</span></li><hr />
                        <li tabIndex="0">Size <span>+</span></li><hr />
                        <li tabIndex="0">Color <span>+</span></li><hr />
                        <li tabIndex="0">Price <span>+</span></li>
                    </ul>
                </aside>
                <main className="content">
                    <div className="filter-sidebar">
                        <h2 tabIndex="0">Filters</h2>
                        <ul>
                            <li tabIndex="0">Type <span>+</span></li><hr />
                            <li tabIndex="0">Size <span>+</span></li><hr />
                            <li tabIndex="0">Color <span>+</span></li><hr />
                            <li tabIndex="0">Price <span>+</span></li>
                        </ul>
                    </div>
                    <div className="sale-banner">
                        <h1 tabIndex="0">SALE <span>50%</span></h1>
                        <p tabIndex="0">On a Wide Range Of Products</p>
                        <button>SHOP NOW</button>
                    </div>
                    <h2 className="products-title" tabIndex="0">Products</h2>
                    <div className="products" id="products-container">
                        {(selected !== null
                            ? [obj.results[selected]]
                            : filtered
                        ).map(product => {
                            const idx = selected !== null
                                ? selected
                                : product.originalIndex;
                            const sel = swatchSel[idx] || 0;
                            const imgSrc = product.swatches
                                ? product.swatches[sel].img.src
                                : product.productImg;

                            return (
                                <div
                                    key={idx}
                                    className="product-card"
                                    tabIndex="0"
                                    onClick={() => setSelected(idx)}
                                    onKeyDown={e => e.key === 'Enter' && setSelected(idx)}
                                >
                                    <div className="product-info">
                                        <div
                                            className="forfilter"
                                            tabIndex="0"
                                            aria-label="Filter 104 Times"
                                        >
                                            <hr />
                                            Sort  <span style={{ color: 'gray' }}>Relevance
                                            </span>
                                            <hr />
                                        </div>
                                        <img
                                            src={imgSrc}
                                            alt={product.productName}
                                            className="productimg"
                                            tabIndex="0"
                                        />
                                    </div>

                                    <div className="product-info">
                                        <div
                                            className="forfilter"
                                            tabIndex="0"
                                            aria-label="Filter 104 Times"
                                        >
                                            <hr />
                                            Filter <span style={{ color: 'gray' }}>104 Times</span>
                                            <hr />
                                        </div>
                                        <p className="quickshop" tabIndex="0">
                                            Quick shop
                                        </p>
                                        <Link
                                            to={`/products?id=${idx}`}
                                            className="forhref"
                                        >

                                            <h3 className="product-title" tabIndex="0">
                                                {product.productName}
                                            </h3>
                                        </Link>
                                        <p className="product-price" tabIndex="0">
                                            {product.productPriceFormatted}
                                        </p>
                                        <p className="product-price" tabIndex="0">
                                            {product.productName} {sel + 1} selected
                                        </p>
                                        {product.swatches && (
                                            <div className="swatches">
                                                {product.swatches.slice(0, 3).map((swatch, j) => (
                                                    <img
                                                        key={j}
                                                        className={`swatch ${j === sel ? 'selected' : ''}`}
                                                        tabIndex="0"
                                                        src={swatch.img.src}
                                                        alt={swatch.swatchName}
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            setSwatchSel(s => ({ ...s, [idx]: j }));
                                                        }}
                                                        onKeyDown={e =>
                                                            e.key === 'Enter' && (e.stopPropagation(), setSwatchSel(s => ({ ...s, [idx]: j })))
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        </>
    );
};

export default HomePage;
