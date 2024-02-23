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

// TODO: bugfix: sometimes, when redirecting from register in the header, there's a brief error screen flashing up
// TODO: export workspace file
// TODO: package updates
// TODO: what about testability?
// TODO: performance improvements
// TODO: bugfix: if the user deletes local storage, the app crashes on refresh
// TODO: add error boundaries
// TODO: add pages/index.js for easier imports
// TODO: WCAG compliance
// TODO: add a HOC somewhere
// TODO: translations
// TODO: logout after session expires
// TODO: what happens when switching tabs
// TODO: implement multi-tenancy
// TODO: oidc user
// TODO: multifactor authentication?
// TODO: fix high memory usage
// TODO: test error states with devtools
/* TODO: next: bugfix 
if I login on one tab and open a new tab, the new tab will don't have me logged in, even after a page refresh
if I login on one tab with a user, add to the cart, then on the other tab login with another user, the cart will still be there
*/
