import { Outlet } from 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';

import Header from './components/Header';
import MainPage from './components/MainPage';
import Navbar from './components/Navbar';
import { useAppSelector } from './hooks/reduxHooks';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import PageNotFoundErrorPage from './pages/PageNotFoundErrorPage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import { RootState } from './state/store/store';

export default function App() {
  const userLoggedIn = useAppSelector(
    (state: RootState) => state.user.userLoggedIn
  );

  const routes = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <MainPage /> },
        { path: '/about', element: <AboutPage /> },
        { path: '/products', element: <ProductsPage /> },
        { path: '/products/:id', element: <ProductPage /> },
        { path: '/cart', element: <CartPage /> },
        {
          path: '/checkout',
          element: userLoggedIn ? <CheckoutPage /> : <Navigate to='/login' />,
        },
        {
          path: '/orders',
          element: userLoggedIn ? <OrdersPage /> : <Navigate to='/login' />,
        },
      ],
    },
    { path: '*', element: <PageNotFoundErrorPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
  ]);

  return routes;
}

function MainLayout() {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
    </>
  );
}

// TODO: rehydration is called on frst startup and fetches everything
// TODO: keep product card ordering (list or not) after navigation
// TODO: loading should be still set to false by default
// TODO: -1 product is also fetched
// TODO: too many API calls
// TODO: export workspace file
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
