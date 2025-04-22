import React, {  } from 'react';
import { Link } from 'react-router-dom';
export default function ProductCard({ idx, product, setSelected, setSwatchSel, imgSrc, sel }) {

 
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
}