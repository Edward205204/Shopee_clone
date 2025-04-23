import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeLocalStorage } from '../../utils/auth';
import { useContext } from 'react';
import { AppContext } from '../../contexts/app.context';
import { Link, useNavigate } from 'react-router';
import path from '../../constants/path';
import { authApi } from '../../APIs/userRegister.api';
import { purchasesStatus } from '../../constants/purchasesStatus';
import PopOver from '../PopOver';
import { getAvatarUrl } from '../../utils/utils';

export default function NavHeader() {
  const queryClient = useQueryClient();
  const { isAuthenticated, setIsAuthenticated, profile } = useContext(AppContext);
  const navigate = useNavigate();

  const useLogoutMutation = useMutation({
    mutationFn: authApi.LogoutRequest,
    onSuccess: () => {
      setIsAuthenticated(false);
      removeLocalStorage();
      navigate(path.home);
      queryClient.removeQueries({ queryKey: ['purchaseList', purchasesStatus.inCart] });
    }
  });

  const handleLogout = () => {
    useLogoutMutation.mutate();
  };
  return (
    <>
      <div className='flex items-center justify-between bg-transparent'>
        <nav>
          <ul className='flex items-center space-x-6 text-sm text-white'>
            <li className='relative after:content-["|"] after:absolute after:-right-4 after:text-gray-400'>
              <Link to={path.home}>Kênh người bán</Link>
            </li>
            <li className='relative after:content-["|"] after:absolute after:-right-4 after:text-gray-400'>
              <Link to={path.home}>Tải ứng dụng</Link>
            </li>
            <li>
              <ul className='flex flex-row items-center justify-between'>
                <li>Kết nối</li>
                <li>
                  <Link to={'https://facebook.com'}>
                    <svg
                      fill='none'
                      className='w-5 h-5 ml-3'
                      version='1.1'
                      id='Layer_1'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='-143 145 512 512'
                      style={{ backgroundColor: 'white', borderRadius: '50%' }}
                    >
                      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                      <g id='SVGRepo_iconCarrier'>
                        <g>
                          <path
                            d='M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7 c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4 c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8 c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4 c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z'
                            fill='white'
                            stroke='white'
                            strokeWidth='10'
                          ></path>
                          <path
                            d='M146.8,313.7c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H51.2v38.3h26.5v133h49.6v-133h39.3l2.9-38.3h-42.2v-29.9C127.3,317.4,136.5,313.7,146.8,313.7z'
                            style={{ fill: 'red' }}
                            strokeWidth='20'
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to='https://instagram.com'>
                    <svg
                      className='w-5 h-5 ml-1 text-headerBg'
                      fill='red'
                      stroke='red'
                      strokeWidth='20'
                      version='1.1'
                      id='Layer_1'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                      style={{ backgroundColor: 'white', borderRadius: '50%' }}
                    >
                      <g id='SVGRepo_iconCarrier'>
                        <g>
                          <path d='M347.845,97.011H164.155c-37.024,0-67.144,30.121-67.144,67.144v183.692c0,37.022,30.121,67.143,67.144,67.143h183.692 c37.022,0,67.143-30.121,67.143-67.144V164.155C414.989,127.131,384.869,97.011,347.845,97.011z M398.821,347.845 c0,28.108-22.868,50.976-50.976,50.976H164.155c-28.108,0-50.976-22.868-50.976-50.976V164.155 c0-28.108,22.868-50.976,50.976-50.976h183.692c28.107,0,50.975,22.868,50.975,50.976V347.845z'></path>
                        </g>
                        <g>
                          <path d='M339.402,251.22c-2.391-42.533-37.002-76.75-79.558-78.669c-49.108-2.214-89.535,38.232-87.292,87.346 c1.945,42.56,36.19,77.154,78.728,79.51c17.951,0.995,34.762-3.727,48.803-12.494c4.374-2.731,5.087-8.814,1.441-12.459 c-0.039-0.039-0.077-0.077-0.115-0.115c-2.657-2.658-6.778-3.059-9.971-1.075c-10.491,6.519-22.892,10.241-36.158,10.102 c-37.455-0.394-67.676-31.844-66.621-69.286c1.061-37.681,33.215-67.721,71.657-65.312c33.126,2.076,60.09,28.49,62.819,61.569 c1.111,13.475-1.787,26.206-7.61,37.157c-1.667,3.136-1.153,6.982,1.358,9.493c0.041,0.041,0.083,0.083,0.124,0.124 c3.773,3.773,10.154,2.886,12.675-1.816C336.664,282.269,340.301,267.197,339.402,251.22z'></path>
                        </g>
                        <g>
                          <circle cx='342.232' cy='158.989' r='21.558'></circle>
                        </g>
                      </g>
                    </svg>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className='flex items-center'>
          <div className='cursor-pointer hover:opacity-80'>
            <a href='https://help.shopee.vn/portal/4/vn/s' className='flex items-center' target='_blank'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6 bg-transparent'
              >
                <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                <g id='SVGRepo_iconCarrier'>
                  <path
                    d='M12 17V16.9929M12 14.8571C12 11.6429 15 12.3571 15 9.85714C15 8.27919 13.6568 7 12 7C10.6567 7 9.51961 7.84083 9.13733 9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </g>
              </svg>
              <div className='ml-1 text-sm text-white'>Hỗ trợ</div>
            </a>
          </div>
          <PopOver
            className='relative flex items-center ml-4 cursor-pointer hover:opacity-80'
            popOverClass='p-5 text-sm text-black bg-white shadow-sm cursor-pointer pr-28'
            renderProps={
              <>
                <button className='hover:text-[#ee4d2d] block mb-4'>Tiếng Việt</button>
                <button className='hover:text-[#ee4d2d] block'>English</button>
              </>
            }
          >
            <svg
              viewBox='0 0 24 24'
              fill='transparent'
              xmlns='http://www.w3.org/2000/'
              className='w-5 h-5 bg-transparent'
            >
              <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
              <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
              <g id='SVGRepo_iconCarrier'>
                <path
                  d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
                <path
                  d='M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
                <path
                  d='M15 3C16.95 8.84 16.95 15.16 15 21'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
                <path
                  d='M3 16V15C8.84 16.95 15.16 16.95 21 15V16'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
                <path
                  d='M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </g>
            </svg>
            <div className='ml-2 text-sm text-white'>Tiếng Việt</div>
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 bg-transparent'>
              <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
              <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
              <g id='SVGRepo_iconCarrier'>
                <path
                  d='M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z'
                  fill='white'
                ></path>
              </g>
            </svg>
          </PopOver>
          {isAuthenticated && (
            <PopOver
              className='flex items-center ml-3 cursor-pointer group'
              popOverClass='text-sm text-black bg-white shadow-sm cursor-pointer '
              renderProps={
                <>
                  <button
                    className='block w-full p-2 mb-2 text-left hover:text-teal-500 hover:bg-slate-200'
                    onClick={() => navigate(path.profile)}
                  >
                    Tài khoản của tôi
                  </button>
                  <button className='block w-full p-2 mb-2 text-left hover:text-teal-500 hover:bg-slate-200'>
                    Đơn mua
                  </button>
                  <button
                    className='block w-full p-2 text-left hover:text-teal-500 hover:bg-slate-200'
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </>
              }
            >
              <img className='w-6 h-6 rounded-full' src={getAvatarUrl(profile?.avatar)} alt='user_avatar' />
              <div className='ml-2 text-sm text-white group-hover:opacity-80'>{profile?.email}</div>
            </PopOver>
          )}
          {!isAuthenticated && (
            <div className='relative flex items-center ml-4 text-sm text-white cursor-pointer '>
              <div className='mr-2 hover:text-gray-300'>
                <Link to={path.login}>Đăng nhập</Link>
              </div>
              <div className='h-4 mr-2 border-r border-gray-300'></div>
              <div className='hover:text-gray-300'>
                <Link to={path.register}>Đăng ký</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
