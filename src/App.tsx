import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Navbar from './components/Navbar';
import PageNotFoundErrorPage from './pages/PageNotFoundErrorPage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<MainPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/orders' element={<OrdersPage />} />
      </Route>
      <Route path='*' element={<PageNotFoundErrorPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  );

  function MainLayout() {
    return (
      <>
        <Header />
        <Navbar />
        <Outlet />
      </>
    );
  }
}

// TODO: add pages/index.js for easier imports
