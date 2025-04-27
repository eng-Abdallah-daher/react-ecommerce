
import React, { useState, useEffect } from 'react';
import '../css/home_Page.css';
import '../css/products_Page.css';
import '../css/cart.css';
import ProductCard from './components/ProductCard'
import { obj } from '../data/products';
import Navbar from './components/Navbar';
import FiltersSidebar from './components/FiltersSidebar';
const HomePage = () => {
    const [filtered, setFiltered] = useState([]);
    
    const [showSuggest, setShowSuggest] = useState(false);
    const [swatchSel, setSwatchSel] = useState({});

    useEffect(() => {
        setFiltered(
            obj.results.map((p, i) => ({ ...p, originalIndex: i }))
        );
    }, []);

    const chooseSuggest = idx => {
 
        setShowSuggest(false);
    };
    return (
        <>
      
    <Navbar chooseSuggest={chooseSuggest}/>
            <div className="container">
              <FiltersSidebar />
                <main className="content">
      
                    <div className="sale-banner">
                        <h1 tabIndex="0">SALE <span>50%</span></h1>
                        <p tabIndex="0">On a Wide Range Of Products</p>
                        <button>SHOP NOW</button>
                    </div>
                    <h2 className="products-title" tabIndex="0">Products</h2>
                    <div className="products" id="products-container">
                        {( filtered
                        ).map(product => {
                            const idx =  product.originalIndex;
                            const sel = swatchSel[idx] || 0;
                            const imgSrc = product.swatches
                                ? product.swatches[sel].img.src
                                : product.productImg;

                            return (
                                <ProductCard idx={product.index} product={product}  setSwatchSel={setSwatchSel} imgSrc={imgSrc} sel={sel} />
                            );
                        })}
                    </div>
                </main>
            </div>
        </>
    );
};

export default HomePage;
