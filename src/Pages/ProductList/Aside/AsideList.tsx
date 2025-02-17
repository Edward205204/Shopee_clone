import { Link } from 'react-router';
import path from '../../../constants/path';
import Input from '../../../components/Input';

export default function AsideFilter() {
  return (
    <div className='col-span-2 '>
      <div className='mx-2'>
        <div className='mt-10'>
          <Link to={path.home} className='flex items-center gap-2 mb-4 font-bold'>
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-6 h-6'>
              <g id='SVGRepo_bgCarrier' strokeWidth={0} />
              <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
              <g id='SVGRepo_iconCarrier'>
                <path
                  d='M8 8H20M11 12H20M14 16H20M4 8H4.01M7 12H7.01M10 16H10.01'
                  stroke='#000000'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
            </svg>
            <div>Tất cả danh mục</div>
          </Link>
          <div className='h-[1px] mx-4 mb-2 bg-gray-300' />
          <ul className='ml-4 text-sm'>
            <li className='mb-2'>
              <Link to={path.home} className='relative flex items-center font-semibold text-[#ee4d2d]'>
                <svg
                  fill='currentColor'
                  version='1.1'
                  id='Layer_1'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  viewBox='0 0 24 24'
                  xmlSpace='preserve'
                  className='absolute left-[-12px] w-4 h-4'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                  <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
                  <g id='SVGRepo_iconCarrier'>
                    <style type='text/css' dangerouslySetInnerHTML={{ __html: ' .st0{fill:none;} ' }} />
                    <path d='M9,18l7-6L9,6V18z' /> <rect className='st0' width={24} height={24} />
                    <rect className='st0' width={24} height={24} />
                  </g>
                </svg>
                <div className='ml-3'>Thời trang nam</div>
              </Link>
            </li>
            <li className='mb-2'>
              <Link to={path.home}>
                <div className='ml-3'>Đồng hồ</div>
              </Link>
            </li>
            <li className='mb-2'>
              <Link to={path.home}>
                <div className='ml-3'>Giày</div>
              </Link>
            </li>
            <li className='mb-2'>
              <Link to={path.home}>
                <div className='ml-3'>Mũ</div>
              </Link>
            </li>
          </ul>
        </div>
        <div className='mt-10 '>
          <Link to={path.home} className='flex items-center gap-2 mb-4 font-bold uppercase'>
            <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className='w-4 h-5'>
              <g>
                <polyline
                  // fill='none'
                  points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={2}
                />
              </g>
            </svg>
            <div>Bộ Lọc Tìm Kiếm</div>
          </Link>
          <div className='h-[1px] mx-2 mb-2 bg-gray-300' />

          <div className='my-5'>
            <form>
              <div className='mb-2 ml-2'>Khoảng giá</div>
              <div className='flex items-center gap-2 ml-2 text-sm font-normal'>
                <Input
                  type='text'
                  name='from'
                  placeholder='₫ TỪ'
                  classNameInput='h-8 border border-gray-300 outline-none w-20 p-2'
                />
                <div className='w-3 h-[2px] bg-gray-300' />
                <Input
                  type='text'
                  name='from'
                  classNameInput='h-8 border border-gray-300 outline-none w-20 p-2'
                  placeholder='₫ ĐẾN'
                />
              </div>
            </form>
          </div>
        </div>
        <div className='h-[1px] mx-4 mb-2 bg-gray-300' />
        <div className='my-6 font-light'>
          <div className='mb-4 ml-2'>Đánh giá</div>
          <ul>
            <li className='mb-2'>
              <Link to={'/'} className='flex items-center gap-2 ml-2'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <li key={index} className='w-4 h-4'>
                      <svg viewBox='0 0 9.5 8' className='shopee-svg-icon rating-stars__star icon-rating-colored'>
                        <defs>
                          <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                            <stop offset={0} stopColor='#ffca11' />
                            <stop offset={1} stopColor='#ffad27' />
                          </linearGradient>
                          <polygon
                            id='ratingStar'
                            points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                          />
                        </defs>
                        <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                          <g transform='translate(-876 -1270)'>
                            <g transform='translate(155 992)'>
                              <g transform='translate(600 29)'>
                                <g transform='translate(10 239)'>
                                  <g transform='translate(101 10)'>
                                    <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </li>
                  ))}
              </Link>
            </li>
            <li className='mb-2'>
              <Link to={'/'} className='flex items-center gap-2 ml-2'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <li key={index} className='w-4 h-4'>
                      <svg viewBox='0 0 9.5 8' className='shopee-svg-icon rating-stars__star icon-rating-colored'>
                        <defs>
                          <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                            <stop offset={0} stopColor='#ffca11' />
                            <stop offset={1} stopColor='#ffad27' />
                          </linearGradient>
                          <polygon
                            id='ratingStar'
                            points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                          />
                        </defs>
                        <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                          <g transform='translate(-876 -1270)'>
                            <g transform='translate(155 992)'>
                              <g transform='translate(600 29)'>
                                <g transform='translate(10 239)'>
                                  <g transform='translate(101 10)'>
                                    <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </li>
                  ))}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
