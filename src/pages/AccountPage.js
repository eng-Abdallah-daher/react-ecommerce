import { useState, useEffect } from 'react';
import {
    useNavigate,
    useLocation
} from 'react-router-dom';
import '../css/accountPage.css';
import Navbar from './components/Navbar';
import ConfirmDialog from './components/ConfirmDialog';
import { logout } from './utils/loginFunctions';
import ProfileInfo from './components/profileInfo';
import AddressInfo from './components/addressinfo';
import WishlistInfo from './components/wishlistinfo';
function useQuery() {
    return new URLSearchParams(useLocation().search);
}




function Content() {
    const query = useQuery();
    const data = query.get('data');

    if (data === 'profileinfo') return<ProfileInfo />
    if (data === 'addressinfo') return <AddressInfo />
    if (data === 'wishlist') return  <WishlistInfo />

    return <div>Select a section from the menu</div>;
}

function Nav() {
    const [showConfirmlogout, setShowConfirmlogout] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        { key: 'profileinfo', label: 'Profile Info' },
        { key: 'addressinfo', label: 'Address Info' },
        { key: 'wishlist', label: 'Wishlist' }
    ];

    const activeKey = new URLSearchParams(location.search).get('data');

    const goTo = (key) => {
        navigate(`/account?data=${key}`);
    };

    return (
        <nav className="nav-account">

            <ConfirmDialog
                message="Do you want to log out?"
                onConfirm={logout}
                title="Log out"
                onCancel={() => setShowConfirmlogout(false)}
                show={showConfirmlogout}
            />
            {isMobile ? (
                <>

                    <div>
                        {navLinks.map(link => (
                            <details key={link.key} className="accordion-account">
                                <summary className="accordion-summary-account">{link.label}</summary>
                                <button onClick={() => goTo(link.key)} className="accordion-link-account">
                                    Go to {link.label}
                                </button>
                            </details>
                        ))}
                    </div>
                    <button onClick={() => {
                    setShowConfirmlogout(true)
                    }} className="signout-link-account">Sign out</button>
                </>
            ) : (
                    <ul className="nav-list-account">
                    {navLinks.map(link => (
                        <li key={link.key}>
                            <button
                                onClick={() => goTo(link.key)}
                                className={`nav-link-account ${activeKey === link.key ? 'active' : ''}`}
                            >
                                {link.label} →
                            </button>
                        </li>
                    ))}
                    <li>
                            <button onClick={() => setShowConfirmlogout(true)} className="nav-link-account signout-account">Sign out</button>
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default function Layout() {
    const chooseSuggest = idx => {
        window.location.href = `/products?id=${idx}`;
    };
    return (
        <div className="layout-account">
            
            <Navbar chooseSuggest={chooseSuggest}/>
            <div className="main-account">
                <Nav />
                <main className="content-account">
                    <Content />
                </main>
            </div>
            <footer className="footer-account">© 2025</footer>
        </div>
    );
}


