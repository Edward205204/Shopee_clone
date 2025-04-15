import { Outlet } from 'react-router';
import SideNav from '../../components/SideNav';

export default function UserLayout() {
  return (
    <div className='bg-[#f5f5f5] border-b border-[#ee4d2d]'>
      <div className='container py-4 '>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-12'>
          <div className='col-span-1 my-6 mt-10 md:col-span-2'>
            <SideNav />
          </div>
          <div className='col-span-1 my-6 mt-10 md:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
