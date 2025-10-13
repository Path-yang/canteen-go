import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import MenuScreen from './screens/MenuScreen';
import HomeScreen from './screens/HomeScreen';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import CartScreen from './screens/CartScreen';

function AppInner() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <div className="min-h-screen bg-gray-50">
      {!isHome && <Header />}
      <main className={isHome ? '' : 'container mx-auto px-4 py-8'}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/item/:id" element={<ItemDetailsScreen />} />
          <Route path="/cart" element={<CartScreen />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppInner />
      </Router>
    </CartProvider>
  );
}

export default App;
