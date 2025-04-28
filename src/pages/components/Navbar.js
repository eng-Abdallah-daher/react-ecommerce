import React, { useState} from 'react';
import Cart from '../cart';
import NavbarLinks from './NavbarLinks';
import mobileMenuItems from './MobileContent';
import SearchBar from './SearchBar';
import Wishlist from './Wishlist'
import User from '../components/UserGreeting'
export default function Navbar({ chooseSuggest }) {
   
   
    const [mobileActive, setMobileActive] = useState(false);
    const [mobileContent, setMobileContent] = useState('menu');
 

  
    const changeMobileContent = category => setMobileContent(category);
  

  

    return (
        <div>
        <div className="navbar">
            <div className="forlogos">
                <div className="logo" tabIndex="0">MY SHOP</div>

                    <SearchBar chooseSuggest={chooseSuggest}/>

                <div className="icons" style={{width:"30%"}}>
                   
                        <Wishlist />
                    <Cart  />
                    <User />
                </div>
            </div>

      <NavbarLinks  />

        </div>
            <div className="navbar-top-small-screen navbar-top">
                <div className='navbar-top'>
                    <div className="logo" tabIndex="0">MY SHOP</div>
                    <div className="icons" style={{ width: "60%" }}>
                        <i tabIndex="0"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    window.location.href = '/wishlist'
                                }
                            }}
                            onClick={() => {
                                window.location.href = '/wishlist'
                            }}>❤️
                            </i>
                        <i tabIndex="0"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    window.location.href = '/cart'
                                }
                            }}
                            onClick={() => {
                                window.location.href = '/cart'
                            }}>🛒</i>
                        <User />
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
                <SearchBar chooseSuggest={chooseSuggest} />

             
            </div> 
            <div className={mobileActive ? 'navbar-bottom active' : 'navbar-bottom'} id="menu-list">
                <ul>{mobileMenuItems(mobileContent, changeMobileContent)}</ul>
            </div>
        </div>
    );
}
