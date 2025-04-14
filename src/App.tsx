import useReactRouter from './useReactRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { LocalStorageEventTarget } from './utils/auth';
import { AppContext } from './contexts/app.context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});
function App() {
  const { reset } = useContext(AppContext);

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', () => {
      reset();
    });
  }, [reset]);

  const element = useReactRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <div>{element}</div>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
