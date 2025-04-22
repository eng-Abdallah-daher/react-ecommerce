import React, { useState,  useEffect,useRef } from 'react';
import {Link } from 'react-router-dom';
export default function NavbarLinks() {
  
    const [dropdown, setDropdown] = useState({ products: false, categories: false });
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

    

        const productsTriggerRef = useRef(null);
        const categoriesTriggerRef = useRef(null);
    return (
       <ul className="nav-links">
            <div
                className={activeDropdown ? 'dropdown-overlay active' : 'dropdown-overlay'}
                onClick={() => setDropdown({ products: false, categories: false })}
            />
                           <li><Link to="/" tabIndex="0">Home</Link></li>
       
                           <li
                               style={{ marginTop: '10px' }}
                               ref={productsTriggerRef}
                               className="dropdown-trigger"
                               tabIndex="0"
                aria-label="Products"
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
                aria-label="Categories"
                onMouseEnter={() => setDropdown(d => ({ ...d, categories: true }))}
                onMouseLeave={() => setDropdown(d => ({ ...d, categories: false }))}
                onKeyDown={e => e.key === 'Enter' && setDropdown(d => ({ ...d, categories: !d.categories }))}
            >
                <span>
                    Categories
                    <span
                        className="arrow"
                        style={{
                            transform: dropdown.categories ? 'rotate(180deg)' : 'rotate(0deg)',
                            marginTop: dropdown.categories ? '10px' : '0px'
                        }}
                    >
                        ⌄
                    </span>
                </span>

                {dropdown.categories && (
                    <div className="dropdown active">
                        {['3.1', '3.2', '3.3'].map(k => (
                            <div key={k} className="column">
                                <h3 tabIndex="0">{`${k} CATEGORY LINK HEADER`}</h3>
                                {[1, 2, 3].map(n => (
                                    <Link key={n} to={`/categories/${k}/${n}`} tabIndex="0">
                                        {`${k}.${n}`}
                                    </Link>
                                ))}
                            </div>
                        ))}
                        <a
                            style={{ position: 'absolute', opacity: 0, height: 0, width: 0 }}
                            tabIndex="0"
                            onKeyDown={e => {
                                if (e.key === 'Tab') {
                                    e.preventDefault();
                                    setDropdown({ products: false, categories: false });
                                    categoriesTriggerRef.current.focus();
                                }
                            }}
                        />
                    </div>
                )}
            </li>

                       </ul>
    );
}