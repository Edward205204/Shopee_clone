import { Navigate, Outlet, useRoutes } from 'react-router';
import ErrorPage from './Pages/ErrorPage';
import RegisterLayout from './Layout/RegisterLayout';
import MainLayout from './Layout/MainLayout';
import { lazy, useContext, Suspense } from 'react';
import { AppContext } from './contexts/app.context';
import path from './constants/path';

import CartLayout from './Layout/CartLayout';
import UserLayout from './Pages/User/Layout/UserLayout';

export default function useReactRouter() {
  const { isAuthenticated } = useContext(AppContext);
  function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
  }
  function RejectedRoute() {
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />;
  }

  const ProductList = lazy(() => import('./Pages/ProductList'));
  const Register = lazy(() => import('./Pages/Register'));
  const Login = lazy(() => import('./Pages/Login'));
  const Profile = lazy(() => import('./Pages/User/Page/Profile'));
  const ProductDetail = lazy(() => import('./Pages/ProductDetail'));
  const Cart = lazy(() => import('./Pages/Cart'));
  const ChangePassword = lazy(() => import('./Pages/User/Page/ChangePassword'));
  const HistoryPurchase = lazy(() => import('./Pages/User/Page/HistoryPurchase'));

  const routeElements = useRoutes([
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <Suspense fallback={<div className='flex items-center justify-center w-full h-screen'>Loading...</div>}>
            <ProductList />
          </Suspense>
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
              <Suspense fallback={<div className='flex items-center justify-center w-full h-screen'>Loading...</div>}>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense fallback={<div className='flex items-center justify-center w-full h-screen'>Loading...</div>}>
                <Register />
              </Suspense>
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
              <Suspense fallback={<div className='flex items-center justify-center w-full h-screen'>Loading...</div>}>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.productDetail,
          element: (
            <MainLayout>
              <Suspense fallback={<div className='flex items-center justify-center w-full h-screen'>Loading...</div>}>
                <ProductDetail />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <Suspense fallback={<div className='flex items-center justify-center w-full h-screen'>Loading...</div>}>
                <UserLayout />
              </Suspense>
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense fallback={<div className='flex items-center justify-center w-full h-screen'>Loading...</div>}>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.change_password,
              element: (
                <Suspense fallback={<div className='flex items-center justify-center w-full h-screen'>Loading...</div>}>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.purchase_history,
              element: (
                <Suspense fallback={<div className='flex items-center justify-center w-full h-screen'>Loading...</div>}>
                  <HistoryPurchase />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ]);
  return routeElements;
}
