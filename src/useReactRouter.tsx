import ProductList from './Pages/ProductList';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { Navigate, Outlet, useRoutes } from 'react-router';
import ErrorPage from './Pages/ErrorPage';
import RegisterLayout from './Layout/RegisterLayout';
import MainLayout from './Layout/MainLayout';
import Profile from './Pages/User/Page/Profile';
import { useContext } from 'react';
import { AppContext } from './contexts/app.context';
import path from './constants/path';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import CartLayout from './Layout/CartLayout';
import UserLayout from './Pages/User/Layout/UserLayout';
import ChangePassword from './Pages/User/Page/ChangePassword';
import HistoryPurchase from './Pages/User/Page/HistoryPurchase';

export default function useReactRouter() {
  const { isAuthenticated } = useContext(AppContext);
  function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
  }
  function RejectedRoute() {
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />;
  }

  const routeElements = useRoutes([
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.productDetail,
          element: (
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.change_password,
              element: <ChangePassword />
            },
            {
              path: path.purchase_history,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    },
    {
      path: '/*',
      element: <ErrorPage />
    }
  ]);
  return routeElements;
}
