import { Link } from 'react-router';

export default function ErrorPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-[rgb(237,77,45)] text-6xl font-bold  mb-4'>404</h1>
      <p className='text-2xl text-gray-700 mb-6'>Page Not Found</p>
      <Link
        to='/'
        className=' px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-600 transition duration-300'
      >
        Go Back Home
      </Link>
    </div>
  );
}
