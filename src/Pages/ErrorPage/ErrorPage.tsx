import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

export default function ErrorPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Helmet>
        <title>404 Page | Shopee Clone</title>
        <meta name='description' content='Page Error' />
      </Helmet>
      <h1 className='text-[rgb(237,77,45)] text-6xl font-bold  mb-4'>404</h1>
      <p className='mb-6 text-2xl text-gray-700'>Page Not Found</p>
      <Link
        to='/'
        className='px-6 py-3 text-lg font-medium text-white transition duration-300 bg-blue-500 rounded-lg shadow hover:bg-blue-600'
      >
        Go Back Home
      </Link>
    </div>
  );
}
