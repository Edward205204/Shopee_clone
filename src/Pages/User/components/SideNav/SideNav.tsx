import { Link } from 'react-router';
import path from '../../../../constants/path';
import { useContext } from 'react';
import { AppContext } from '../../../../contexts/app.context';
import { getAvatarUrl } from '../../../../utils/utils';

export default function SideNav() {
  const { profile } = useContext(AppContext);

  return (
    <div>
      <div className='flex flex-wrap items-center justify-center px-2 py-6 pb-8 border-b border-gray-300'>
        <div className='w-12 h-12 overflow-hidden border border-gray-500 rounded-full '>
          <img src={getAvatarUrl(profile?.avatar)} alt='' className='object-cover w-full h-full' />
        </div>
        <div className='ml-4'>
          <div className='text-base font-semibold text-gray-700 truncate'>accessToken</div>
          <div className='flex items-center gap-2'>
            <div>
              <svg
                width={12}
                height={12}
                viewBox='0 0 12 12'
                xmlns='http://www.w3.org/2000/svg'
                style={{ marginRight: 4 }}
              >
                <path
                  d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                  fill='#6b7280'
                  fillRule='evenodd'
                />
              </svg>
            </div>
            <div className='text-sm text-gray-500 capitalize'>Sửa hồ sơ</div>
          </div>
        </div>
      </div>
      <div className='mt-12'>
        <Link to={path.profile} className='block mb-8 text-[#ee4d2d]'>
          Tài khoản của tôi
        </Link>
        <Link to={path.change_password} className='block mb-8 text-gray-500'>
          Đổi mật khẩu
        </Link>
        <Link to={path.purchase_history} className='block mb-8 text-gray-500'>
          Đơn mua
        </Link>
      </div>
    </div>
  );
}
