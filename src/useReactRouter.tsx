import ProductList from './Pages/ProductList';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { useRoutes } from 'react-router';
import ErrorPage from './Pages/ErrorPage';
import RegisterLayout from './Layout/RegisterLayout';
import MainLayout from './Layout/MainLayout';

export default function useReactRouter() {
  const routeElements = useRoutes([
    {
      path: '/*',
      element: <ErrorPage />
    },
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ]);
  return routeElements;
}
