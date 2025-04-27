import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home_Page';
import ProductDetail from './pages/ProductPage';
import CartPage from './pages/cartPage';
import GoodsPage from './pages/goodsPage';
import WishlistPage from './pages/WishlistPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/goods" element={<GoodsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

      </Routes>
    </Router>
  );
}

export default App;
