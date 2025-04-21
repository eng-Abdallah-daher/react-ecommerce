import React, { useEffect, useRef, useState } from 'react';
import '../css/goods.css';
import { TweenMax } from 'gsap';
import ScrollMagic from 'scrollmagic';
import { Link } from 'react-router-dom';
import { obj } from '../data/products';
import Cart from './cart';
import '../css/products_Page.css';
import '../css/cart.css';

function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}
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
const Goods = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(getCookie('cartItems'));
    }, []);

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
        if (activeDropdown) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeDropdown]);












    const heroRef = useRef(null);
    const imageRef = useRef(null);
    const wrapperRef = useRef(null);
    const laptopSectionRef = useRef(null);

    useEffect(() => {
        const controller = new ScrollMagic.Controller();
        if (heroRef.current) {
            new ScrollMagic.Scene({
                triggerElement: heroRef.current,
                triggerHook: 0.5,
                duration: "50%"
            })
                .setTween(TweenMax.to(heroRef.current.querySelector('h1'), 1, { opacity: 1, y: -20 }))
                .addTo(controller);
        }


        if (imageRef.current && wrapperRef.current && laptopSectionRef.current) {
            const img = imageRef.current;
            const wrapper = wrapperRef.current;
            const section = laptopSectionRef.current;

            const maxShift = img.clientWidth - wrapper.clientWidth;

            new ScrollMagic.Scene({
                triggerElement: section,
                triggerHook: 0.5,
                duration: section.offsetHeight
            })
                .on("progress", (e) => {
                    img.style.transform = e.progress > 0.5
                        ? `translateX(-${maxShift}px)`
                        : `translateX(0)`;
                })
                .addTo(controller);
        }


        return () => controller.destroy();
    }, []);

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
            <div className="hero" id="hero" ref={heroRef}>
                <h1 tabIndex="0">Experience Innovation</h1>
            </div>

            <div className="section" id="pre-laptop">
                <h2 tabIndex="0">Introducing Our Latest Innovation</h2>
                <p tabIndex="0">
                    Discover the design and engineering behind our most advanced device yet. Seamlessly blending
                    style and performance, every detail is crafted to perfection.
                </p>
            </div>

            <div className="section" id="laptop-section" ref={laptopSectionRef}>
                <p tabIndex="0">
                    Our latest laptop model combines power with portability. Its compact design and impressive specs
                    make it perfect for work and play.
                </p>
                <div className="laptop-wrapper" ref={wrapperRef}>
                    <img
                        id="scroll-image"
                        className="laptop-content"
                        src="images/laptop2images-removebg-preview.png"
                        alt="Laptop Image"
                        tabIndex="0"
                        ref={imageRef}
                    />
                </div>
                <p tabIndex="0">
                    Keep scrolling to learn more about its innovative features and design excellence.
                </p>
            </div>

            <div className="section" id="post-laptop">
                <h2 tabIndex="0">Advanced Features and Benefits</h2>
                <p tabIndex="0">
                    Delve into the details of our cutting-edge technology and discover the benefits that set this
                    product apart from the rest.
                </p>
            </div>

            <div className="section" id="featured-products">
                <h2 tabIndex="0">Featured Products</h2>
                <p tabIndex="0">
                    Explore our collection of high-quality products designed with innovation and style in mind.
                </p>
            </div>
        </>
    );
};

export default Goods;
