import { ProtectedRoute, RejectedRoute } from './RouteGuards';
import { useRoutes } from 'react-router';
import ErrorPage from '../Pages/ErrorPage';
import RegisterLayout from '../Layout/RegisterLayout';
import MainLayout from '../Layout/MainLayout';
import { lazy, Suspense } from 'react';
import path from '../constants/path';
import CartLayout from '../Layout/CartLayout';
import UserLayout from '../Pages/User/Layout/UserLayout';

const ProductList = lazy(() => import('../Pages/ProductList'));
const Register = lazy(() => import('../Pages/Register'));
const Login = lazy(() => import('../Pages/Login'));
const Profile = lazy(() => import('../Pages/User/Page/Profile'));
const ProductDetail = lazy(() => import('../Pages/ProductDetail'));
const Cart = lazy(() => import('../Pages/Cart'));
const ChangePassword = lazy(() => import('../Pages/User/Page/ChangePassword'));
const HistoryPurchase = lazy(() => import('../Pages/User/Page/HistoryPurchase'));

export default function useReactRouter() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: (
        <Suspense
          fallback={<div className='flex text-[#ee4d2d] items-center justify-center w-full h-screen'>Loading...</div>}
        >
          <MainLayout>
            <ProductList />
          </MainLayout>
        </Suspense>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <Suspense
              fallback={
                <div className='flex text-[#ee4d2d] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <RegisterLayout>
                <Login />
              </RegisterLayout>
            </Suspense>
          )
        },
        {
          path: path.register,
          element: (
            <Suspense
              fallback={
                <div className='flex text-[#ee4d2d] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <RegisterLayout>
                <Register />
              </RegisterLayout>
            </Suspense>
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
            <Suspense
              fallback={
                <div className='flex text-[#ee4d2d] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <CartLayout>
                <Cart />
              </CartLayout>
            </Suspense>
          )
        },
        {
          path: path.productDetail,
          element: (
            <Suspense
              fallback={
                <div className='flex text-[#ee4d2d] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <MainLayout>
                <ProductDetail />
              </MainLayout>
            </Suspense>
          )
        },
        {
          path: path.user,
          element: (
            <Suspense fallback={<div className='flex items-center justify-center w-full h-screen'>Loading...</div>}>
              <MainLayout>
                <UserLayout />
              </MainLayout>
            </Suspense>
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
      path: '*',
      element: <ErrorPage />
    }
  ]);
  return routeElements;
}
