import ProductList from './Pages/ProductList';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { Navigate, Outlet, useRoutes } from 'react-router';
import ErrorPage from './Pages/ErrorPage';
import RegisterLayout from './Layout/RegisterLayout';
import MainLayout from './Layout/MainLayout';
import Profile from './Pages/Profile';
import { useContext } from 'react';
import { AppContext, IAppContext } from './contexts/app.context';

export default function useReactRouter() {
  const { isAuthenticated } = useContext<IAppContext>(AppContext);
  function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />;
  }
  function RejectedRoute() {
    return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />;
  }

  const routeElements = useRoutes([
    {
      path: '/*',
      element: <ErrorPage />
    },
    {
      path: '/',
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
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />
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
          path: 'profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },

    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ]);
  return routeElements;
}
