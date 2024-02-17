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
// TODO: WCAG compliance
// TODO: add a HOC somewhere
// TODO: translations
// TODO: notifications to bottom right
// TODO: logout after session expires
// TODO: what happens when switching tabs
// TODO: implement multi-tenancy
// TODO: preventDefault?
// TODO: register/login page could also use a header
// TODO: oidc user
// TODO: multifactor authentication?
// TODO: fix high memory usage
// TODO: import order
// TODO: test error states with devtools
// TODO: bugfix: you must be logged in to view... if somebody uses the url directly
