import { Outlet } from 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';

import Header from './components/Header';
import MainPage from './components/MainPage';
import Navbar from './components/Navbar';
import { useAppSelector } from './hooks/reduxHooksWrapper';
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
        { path: '/products/:id', element: <ProductPage /> },
        { path: '/products', element: <ProductsPage /> },
        { path: '/cart', element: <CartPage /> },
        {
          path: '/checkout',
          element: userLoggedIn ? <CheckoutPage /> : <Navigate to='/' />,
        },
        {
          path: '/orders',
          element: userLoggedIn ? <OrdersPage /> : <Navigate to='/' />,
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

