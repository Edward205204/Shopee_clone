import { createSearchParams, Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import PopOver from '../PopOver';
import { AppContext } from '../../contexts/app.context';
import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../APIs/userRegister.api';
import { removeLocalStorage } from '../../utils/auth';
import path from '../../constants/path';
import { baseSchema } from '../../utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryConfig } from '../../hooks/useQueryConfig';
import { omit } from 'lodash';

const searchFormSchema = baseSchema.pick({
  search: true
});

export default function Header() {
  const queryConfig = useQueryConfig();
  const { register, handleSubmit } = useForm<{ search: string }>({
    resolver: zodResolver(searchFormSchema)
  });
  const { isAuthenticated, setIsAuthenticated, profile } = useContext(AppContext);
  const navigate = useNavigate();
  const useLogoutMutation = useMutation({
    mutationFn: authApi.LogoutRequest,
    onSuccess: () => {
      setIsAuthenticated(false);
      removeLocalStorage();
      navigate(path.home);
    }
  });

  const handleLogout = () => {
    useLogoutMutation.mutate();
  };

  const onSearchSubmit = (data: { search: string }) => {
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.search.toString() }, ['order', 'sort_by'])
      : { ...queryConfig, name: data.search.toString() };
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    });
  };

  return (
    <div>
      <div className='py-1  bg-gradient-to-b from-[#f53d2d] to-[#f63]'>
        <div className='container'>
          <div className='flex items-center justify-between'>
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
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 bg-transparent'
                >
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
                      <button className='block w-full p-2 mb-2 text-left hover:text-teal-500 hover:bg-slate-200'>
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
                  <img
                    className='w-6 h-6 rounded-full'
                    src='https://down-vn.img.susercontent.com/file/vn-11134226-7ras8-m5wba4nnbbjq53_tn'
                    alt='user_avatar'
                  />
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
          <div className='grid grid-cols-12 pt-8 pb-4'>
            <Link to={path.home}>
              <svg viewBox='0 0 192 65' className='h-8 lg:h-[3.25rem] fill-white'>
                <g fillRule='evenodd'>
                  <path d='M35.6717403 44.953764c-.3333497 2.7510509-2.0003116 4.9543414-4.5823845 6.0575984-1.4379707.6145919-3.36871.9463856-4.896954.8421628-2.3840266-.0911143-4.6237865-.6708937-6.6883352-1.7307424-.7375522-.3788551-1.8370513-1.1352759-2.6813095-1.8437757-.213839-.1790053-.239235-.2937577-.0977428-.4944671.0764015-.1151823.2172535-.3229831.5286218-.7791994.45158-.6616533.5079208-.7446018.5587128-.8221779.14448-.2217688.3792333-.2411091.6107855-.0588804.0243289.0189105.0243289.0189105.0426824.0333083.0379873.0294402.0379873.0294402.1276204.0990653.0907002.0706996.14448.1123887.166248.1287205 2.2265285 1.7438508 4.8196989 2.7495466 7.4376251 2.8501162 3.6423042-.0496401 6.2615109-1.6873341 6.7308041-4.2020035.5160305-2.7675977-1.6565047-5.1582742-5.9070334-6.4908212-1.329344-.4166762-4.6895175-1.7616869-5.3090528-2.1250697-2.9094471-1.7071043-4.2697358-3.9430584-4.0763845-6.7048539.296216-3.8283059 3.8501677-6.6835796 8.340785-6.702705 2.0082079-.004083 4.0121475.4132378 5.937338 1.2244562.6816382.2873109 1.8987274.9496089 2.3189359 1.2633517.2420093.1777159.2898136.384872.1510957.60836-.0774686.12958-.2055158.3350171-.4754821.7632974l-.0029878.0047276c-.3553311.5640922-.3664286.5817134-.447952.7136572-.140852.2144625-.3064598.2344475-.5604202.0732783-2.0600669-1.3839063-4.3437898-2.0801572-6.8554368-2.130442-3.126914.061889-5.4706057 1.9228561-5.6246892 4.4579402-.0409751 2.2896772 1.676352 3.9613243 5.3858811 5.2358503 7.529819 2.4196871 10.4113092 5.25648 9.869029 9.7292478M26.3725216 5.42669372c4.9022893 0 8.8982174 4.65220288 9.0851664 10.47578358H17.2875686c.186949-5.8235807 4.1828771-10.47578358 9.084953-10.47578358m25.370857 11.57065968c0-.6047069-.4870064-1.0948761-1.0875481-1.0948761h-11.77736c-.28896-7.68927544-5.7774923-13.82058185-12.5059489-13.82058185-6.7282432 0-12.2167755 6.13130641-12.5057355 13.82058185l-11.79421958.0002149c-.59136492.0107446-1.06748731.4968309-1.06748731 1.0946612 0 .0285807.00106706.0569465.00320118.0848825H.99995732l1.6812605 37.0613963c.00021341.1031483.00405483.2071562.01173767.3118087.00170729.0236381.003628.0470614.00554871.0704847l.00362801.0782207.00405483.004083c.25545428 2.5789222 2.12707837 4.6560709 4.67201764 4.7519129l.00576212.0055872h37.4122078c.0177132.0002149.0354264.0004298.0531396.0004298.0177132 0 .0354264-.0002149.0531396-.0004298h.0796027l.0017073-.0015043c2.589329-.0706995 4.6867431-2.1768587 4.9082648-4.787585l.0012805-.0012893.0017073-.0350275c.0021341-.0275062.0040548-.0547975.0057621-.0823037.0040548-.065757.0068292-.1312992.0078963-.1964115l1.8344904-37.207738h-.0012805c.001067-.0186956.0014939-.0376062.0014939-.0565167M176.465457 41.1518926c.720839-2.3512494 2.900423-3.9186779 5.443734-3.9186779 2.427686 0 4.739107 1.6486899 5.537598 3.9141989l.054826.1556978h-11.082664l.046506-.1512188zm13.50267 3.4063683c.014933.0006399.014933.0006399.036906.0008531.021973-.0002132.021973-.0002132.044372-.0008531.53055-.0243144.950595-.4766911.950595-1.0271786 0-.0266606-.000853-.0496953-.00256-.0865936.000427-.0068251.000427-.020262.000427-.0635588 0-5.1926268-4.070748-9.4007319-9.09145-9.4007319-5.020488 0-9.091235 4.2081051-9.091235 9.4007319 0 .3871116.022399.7731567.067838 1.1568557l.00256.0204753.01408.1013102c.250022 1.8683731 1.047233 3.5831812 2.306302 4.9708108-.00064-.0006399.00064.0006399.007253.0078915 1.396026 1.536289 3.291455 2.5833031 5.393601 2.9748936l.02752.0053321v-.0027727l.13653.0228215c.070186.0119439.144211.0236746.243409.039031 2.766879.332724 5.221231-.0661182 7.299484-1.1127057.511777-.2578611.971928-.5423827 1.37064-.8429007.128211-.0968312.243622-.1904632.34346-.2781231.051412-.0452164.092372-.083181.114131-.1051493.468898-.4830897.498124-.6543572.215249-1.0954297-.31146-.4956734-.586228-.9179769-.821744-1.2675504-.082345-.1224254-.154023-.2267215-.214396-.3133151-.033279-.0475624-.033279-.0475624-.054399-.0776356-.008319-.0117306-.008319-.0117306-.013866-.0191956l-.00256-.0038391c-.256208-.3188605-.431565-.3480805-.715933-.0970445-.030292.0268739-.131624.1051493-.14997.1245582-1.999321 1.775381-4.729508 2.3465571-7.455854 1.7760208-.507724-.1362888-.982595-.3094759-1.419919-.5184948-1.708127-.8565509-2.918343-2.3826022-3.267563-4.1490253l-.02752-.1394881h13.754612zM154.831964 41.1518926c.720831-2.3512494 2.900389-3.9186779 5.44367-3.9186779 2.427657 0 4.739052 1.6486899 5.537747 3.9141989l.054612.1556978h-11.082534l.046505-.1512188zm13.502512 3.4063683c.015146.0006399.015146.0006399.037118.0008531.02176-.0002132.02176-.0002132.044159-.0008531.530543-.0243144.950584-.4766911.950584-1.0271786 0-.0266606-.000854-.0496953-.00256-.0865936.000426-.0068251.000426-.020262.000426-.0635588 0-5.1926268-4.070699-9.4007319-9.091342-9.4007319-5.020217 0-9.091343 4.2081051-9.091343 9.4007319 0 .3871116.022826.7731567.068051 1.1568557l.00256.0204753.01408.1013102c.250019 1.8683731 1.04722 3.5831812 2.306274 4.9708108-.00064-.0006399.00064.0006399.007254.0078915 1.396009 1.536289 3.291417 2.5833031 5.393538 2.9748936l.027519.0053321v-.0027727l.136529.0228215c.070184.0119439.144209.0236746.243619.039031 2.766847.332724 5.22117-.0661182 7.299185-1.1127057.511771-.2578611.971917-.5423827 1.370624-.8429007.128209-.0968312.243619-.1904632.343456-.2781231.051412-.0452164.09237-.083181.11413-.1051493.468892-.4830897.498118-.6543572.215246-1.0954297-.311457-.4956734-.586221-.9179769-.821734-1.2675504-.082344-.1224254-.154022-.2267215-.21418-.3133151-.033492-.0475624-.033492-.0475624-.054612-.0776356-.008319-.0117306-.008319-.0117306-.013866-.0191956l-.002346-.0038391c-.256419-.3188605-.431774-.3480805-.716138-.0970445-.030292.0268739-.131623.1051493-.149969.1245582-1.999084 1.775381-4.729452 2.3465571-7.455767 1.7760208-.507717-.1362888-.982582-.3094759-1.419902-.5184948-1.708107-.8565509-2.918095-2.3826022-3.267311-4.1490253l-.027733-.1394881h13.754451zM138.32144123 49.7357905c-3.38129629 0-6.14681004-2.6808521-6.23169343-6.04042014v-.31621743c.08401943-3.35418649 2.85039714-6.03546919 6.23169343-6.03546919 3.44242097 0 6.23320537 2.7740599 6.23320537 6.1960534 0 3.42199346-2.7907844 6.19605336-6.23320537 6.19605336m.00172791-15.67913203c-2.21776751 0-4.33682838.7553485-6.03989586 2.140764l-.19352548.1573553V34.6208558c0-.4623792-.0993546-.56419733-.56740117-.56419733h-2.17651376c-.47409424 0-.56761716.09428403-.56761716.56419733v27.6400724c0 .4539841.10583425.5641973.56761716.5641973h2.17651376c.46351081 0 .56740117-.1078454.56740117-.5641973V50.734168l.19352548.1573553c1.70328347 1.3856307 3.82234434 2.1409792 6.03989586 2.1409792 5.27140956 0 9.54473746-4.2479474 9.54473746-9.48802964 0-5.239867-4.2733279-9.48781439-9.54473746-9.48781439M115.907646 49.5240292c-3.449458 0-6.245805-2.7496948-6.245805-6.1425854 0-3.3928907 2.79656-6.1427988 6.245805-6.1427988 3.448821 0 6.24538 2.7499081 6.24538 6.1427988 0 3.3926772-2.796346 6.1425854-6.24538 6.1425854m.001914-15.5438312c-5.28187 0-9.563025 4.2112903-9.563025 9.4059406 0 5.1944369 4.281155 9.4059406 9.563025 9.4059406 5.281657 0 9.562387-4.2115037 9.562387-9.4059406 0-5.1946503-4.280517-9.4059406-9.562387-9.4059406M94.5919049 34.1890939c-1.9281307 0-3.7938902.6198995-5.3417715 1.7656047l-.188189.1393105V23.2574169c0-.4254677-.1395825-.5643476-.5649971-.5643476h-2.2782698c-.4600414 0-.5652122.1100273-.5652122.5643476v29.2834155c0 .443339.1135587.5647782.5652122.5647782h2.2782698c.4226187 0 .5649971-.1457701.5649971-.5647782v-9.5648406c.023658-3.011002 2.4931278-5.4412923 5.5299605-5.4412923 3.0445753 0 5.516841 2.4421328 5.5297454 5.4630394v9.5430935c0 .4844647.0806524.5645628.5652122.5645628h2.2726775c.481764 0 .565212-.0824666.565212-.5645628v-9.5710848c-.018066-4.8280677-4.0440197-8.7806537-8.9328471-8.7806537M62.8459442 47.7938061l-.0053397.0081519c-.3248668.4921188-.4609221.6991347-.5369593.8179812-.2560916.3812097-.224267.551113.1668119.8816949.91266.7358184 2.0858968 1.508535 2.8774525 1.8955369 2.2023021 1.076912 4.5810275 1.646045 7.1017886 1.6975309 1.6283921.0821628 3.6734936-.3050536 5.1963734-.9842376 2.7569891-1.2298679 4.5131066-3.6269626 4.8208863-6.5794607.4985136-4.7841067-2.6143125-7.7747902-10.6321784-10.1849709l-.0021359-.0006435c-3.7356476-1.2047686-5.4904836-2.8064071-5.4911243-5.0426086.1099976-2.4715346 2.4015793-4.3179454 5.4932602-4.4331449 2.4904317.0062212 4.6923065.6675996 6.8557356 2.0598624.4562232.2767364.666607.2256796.9733188-.172263.035242-.0587797.1332787-.2012238.543367-.790093l.0012815-.0019308c.3829626-.5500403.5089793-.7336731.5403767-.7879478.258441-.4863266.2214903-.6738208-.244985-1.0046173-.459427-.3290803-1.7535544-1.0024722-2.4936356-1.2978721-2.0583439-.8211991-4.1863175-1.2199998-6.3042524-1.1788111-4.8198184.1046878-8.578747 3.2393171-8.8265087 7.3515337-.1572005 2.9703036 1.350301 5.3588174 4.5000778 7.124567.8829712.4661613 4.1115618 1.6865902 5.6184225 2.1278667 4.2847814 1.2547527 6.5186944 3.5630343 6.0571315 6.2864205-.4192725 2.4743234-3.0117991 4.1199394-6.6498372 4.2325647-2.6382344-.0549182-5.2963324-1.0217793-7.6043603-2.7562084-.0115337-.0083664-.0700567-.0519149-.1779185-.1323615-.1516472-.1130543-.1516472-.1130543-.1742875-.1300017-.4705335-.3247898-.7473431-.2977598-1.0346184.1302162-.0346012.0529875-.3919333.5963776-.5681431.8632459' />
                </g>
              </svg>
            </Link>
            <form
              className='relative flex col-start-3 col-end-12 mr-10 h-[80%] translate-y-[20%]'
              onSubmit={handleSubmit(onSearchSubmit)}
            >
              <input
                type='text'
                {...register('search')}
                placeholder='Tìm sản phẩm, thương hiệu, và tên shop'
                className='w-full h-full px-3 py-4 text-sm border-none rounded-sm shadow-sm outline-none '
              />
              <button className='absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center px-6 py-2 bg-[#fb5533] rounded-sm shadow-sm transition-all hover:opacity-80 active:scale-95'>
                <svg
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  stroke='#ffffff'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                  <g id='SVGRepo_iconCarrier'>
                    <path
                      d='M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z'
                      stroke='#ffffff'
                      strokeWidth='3'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>
                  </g>
                </svg>
              </button>
            </form>
            <div className='flex items-end justify-center col-span-1 justify-self-start'>
              <PopOver
                renderProps={
                  <div className='p-4 bg-white rounded-sm shadow-sm w-80'>
                    <div className='mb-4 text-sm text-gray-500 capitalize'>Sản phẩm mới thêm</div>
                    <div className='flex items-center mb-4'>
                      <img
                        src='https://down-vn.img.susercontent.com/file/vn-11134226-7ras8-m5wba4nnbbjq53_tn'
                        alt='ảnh sản phẩm'
                        className='object-cover w-6 h-6 shrink-0'
                      />
                      <div className='ml-2 mr-2 overflow-hidden text-sm truncate '>
                        Bộ Chia 4 Cổng usb c hub 3.0 type c 3.1 Cho xiaomi lenovo macbook pro 13 15 air pro pc
                      </div>
                      <div className='text-[#ee4d2d] text-sm '>₫28.000</div>
                    </div>
                    <div className='flex items-center mb-4'>
                      <img
                        src='https://down-vn.img.susercontent.com/file/vn-11134226-7ras8-m5wba4nnbbjq53_tn'
                        alt='ảnh sản phẩm'
                        className='object-cover w-6 h-6 shrink-0'
                      />
                      <div className='ml-2 mr-2 overflow-hidden text-sm truncate '>
                        Bộ Chia 4 Cổng usb c hub 3.0 type c 3.1 Cho xiaomi lenovo macbook pro 13 15 air pro pc
                      </div>
                      <div className='text-[#ee4d2d] text-sm '>₫28.000</div>
                    </div>
                    <div className='flex items-center mb-4'>
                      <img
                        src='https://down-vn.img.susercontent.com/file/vn-11134226-7ras8-m5wba4nnbbjq53_tn'
                        alt='ảnh sản phẩm'
                        className='object-cover w-6 h-6 shrink-0'
                      />
                      <div className='ml-2 mr-2 overflow-hidden text-sm truncate '>
                        Bộ Chia 4 Cổng usb c hub 3.0 type c 3.1 Cho xiaomi lenovo macbook pro 13 15 air pro pc
                      </div>
                      <div className='text-[#ee4d2d] text-sm '>₫28.000</div>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                      <div className='text-sm text-gray-500 capitalize'>Thêm vào giỏ hàng</div>
                      <button className='bg-[#fb5533] text-white text-sm hover:opacity-80 py-2 px-1 rounded-sm shadow-sm capitalize'>
                        Xem giỏ hàng
                      </button>
                    </div>
                  </div>
                }
              >
                <Link to={path.home}>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='mb-1 cursor-pointer w-7 h-7'
                  >
                    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                    <g id='SVGRepo_iconCarrier'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M14 2C14 1.44772 13.5523 1 13 1C12.4477 1 12 1.44772 12 2V8.58579L9.70711 6.29289C9.31658 5.90237 8.68342 5.90237 8.29289 6.29289C7.90237 6.68342 7.90237 7.31658 8.29289 7.70711L12.2929 11.7071C12.6834 12.0976 13.3166 12.0976 13.7071 11.7071L17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L14 8.58579V2ZM1 3C1 2.44772 1.44772 2 2 2H2.47241C3.82526 2 5.01074 2.90547 5.3667 4.21065L5.78295 5.73688L7.7638 13H18.236L20.2152 5.73709C20.3604 5.20423 20.9101 4.88998 21.4429 5.03518C21.9758 5.18038 22.29 5.73006 22.1448 6.26291L20.1657 13.5258C19.9285 14.3962 19.1381 15 18.236 15H8V16C8 16.5523 8.44772 17 9 17H16.5H18C18.5523 17 19 17.4477 19 18C19 18.212 18.934 18.4086 18.8215 18.5704C18.9366 18.8578 19 19.1715 19 19.5C19 20.8807 17.8807 22 16.5 22C15.1193 22 14 20.8807 14 19.5C14 19.3288 14.0172 19.1616 14.05 19H10.95C10.9828 19.1616 11 19.3288 11 19.5C11 20.8807 9.88071 22 8.5 22C7.11929 22 6 20.8807 6 19.5C6 18.863 6.23824 18.2816 6.63048 17.8402C6.23533 17.3321 6 16.6935 6 16V14.1339L3.85342 6.26312L3.43717 4.73688C3.31852 4.30182 2.92336 4 2.47241 4H2C1.44772 4 1 3.55228 1 3ZM16 19.5C16 19.2239 16.2239 19 16.5 19C16.7761 19 17 19.2239 17 19.5C17 19.7761 16.7761 20 16.5 20C16.2239 20 16 19.7761 16 19.5ZM8 19.5C8 19.2239 8.22386 19 8.5 19C8.77614 19 9 19.2239 9 19.5C9 19.7761 8.77614 20 8.5 20C8.22386 20 8 19.7761 8 19.5Z'
                        fill='#fff'
                      ></path>
                    </g>
                  </svg>
                </Link>
              </PopOver>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
