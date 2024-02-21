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

// what if I save a cart, logout, and then login again with a different user?
// TODO: package updates
// TODO: what about testability?
// TODO: performance improvements
// TODO: save token to cookies
// TODO: bugfix: if the user deletes local storage, the app crashes on refresh
// TODO: add error boundaries
// TODO: login/register buttons are unresponsive
// TODO: when user logs out, the restricted menus are still available, user is not redirected to login
// TODO: add pages/index.js for easier imports
// TODO: WCAG compliance
// TODO: add a HOC somewhere
// TODO: translations
// TODO: logout after session expires
// TODO: what happens when switching tabs
// TODO: implement multi-tenancy
// TODO: preventDefault?
// TODO: oidc user
// TODO: multifactor authentication?
// TODO: fix high memory usage
// TODO: import order
// TODO: test error states with devtools
// TODO: bugfix: you must be logged in to view... if somebody uses the url directly
/*
TODO: bugfix: 
WARNING in [eslint]
src/hooks/hooks.ts
  Line 1:32:  'useDispatch' import from 'react-redux' is restricted. Use typed hooks `useAppDispatch` and `useAppSelector` instead  @typescript-eslint/no-restricted-imports
  Line 1:45:  'useSelector' import from 'react-redux' is restricted. Use typed hooks `useAppDispatch` and `useAppSelector` instead  @typescript-eslint/no-restricted-imports*/
