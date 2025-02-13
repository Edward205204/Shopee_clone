import useReactRouter from './useReactRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import AppContext from './contexts/app.context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});
function App() {
  const element = useReactRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <div>{element}</div>
      </AppContext>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
