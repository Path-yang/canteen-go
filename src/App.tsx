import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Header from './components/Header';
import MenuScreen from './screens/MenuScreen';
import HomeScreen from './screens/HomeScreen';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import CartScreen from './screens/CartScreen';
import StaffDashboard from './screens/StaffDashboard';

function AppInner() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {!isHome && <Header />}
      <main className={isHome ? '' : 'container mx-auto px-4 py-8'}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/item/:id" element={<ItemDetailsScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/staff" element={<StaffDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <CartProvider>
        <Router>
          <AppInner />
        </Router>
      </CartProvider>
    </DarkModeProvider>
  );
}

export default App;
