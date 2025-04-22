import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { obj } from '../data/products'
import Navbar from './components/Navbar';
import '../css/products_Page.css';
import '../css/cart.css';
import { addNewItem } from './utils/Functions';


export default function ProductPage() {

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



    const [swname, setswname] = useState("black");

    const chooseSuggest = idx => {
        window.location.href = `/products?id=${idx}`;
    };

    useEffect(() => {
        if (product && product.swatches && product.swatches.length > 0) {
            setswname(product.swatches[swatchIdx].swatchName);
        }
    }, [product, swatchIdx]);

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
            <Navbar chooseSuggest={chooseSuggest}/>
   
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
                                    onClick={() => addNewItem(product, images[0], qty, swname)}
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
