import { Link } from 'react-router';

export default function Product() {
  return (
    <Link to={'/'}>
      <div
        className='bg-white rounded-sm shadow-lg hover:translate-y-[-.25rem] hover:shadow-md duration-100
      transition-transform overflow-hidden min-h-8'
      >
        <div className='w-full pt-[100%] relative '>
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m6euw72d8n1da0.webp'
            alt=''
            className='absolute top-0 left-0 object-cover w-full h-full'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[1.75rem] text-sm line-clamp-2'>Áo thun nam cổ</div>
          <div className='flex items-center mt-3'>
            <div className='text-sm text-gray-300 line-through'>
              <span className='text-xs'>đ</span>
              <span>5.000</span>
            </div>
            <div className='ml-2 text-base text-[#ee4d2d]'>
              <span className='text-sm'>đ</span>
              <span>1.000</span>
            </div>
          </div>
          <div className='flex items-center justify-start mt-2 mb-2'>
            <div className='flex item-center'>
              <div className='relative '>
                <div className='absolute top-0 left-0 overflow-hidden ' style={{ width: '50%' }}>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-3 h-3 ' viewBox='0 0 12 12'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.99983 9.93762L2.76524 11.7208C2.54602 11.8417 2.28393 11.6567 2.32433 11.4097L2.94569 7.61076L0.300721 4.9072C0.129793 4.73248 0.228342 4.43764 0.469974 4.40083L4.11226 3.84584L5.72839 0.411994C5.83648 0.18233 6.16317 0.18233 6.27126 0.411995L7.88739 3.84584L11.5297 4.40083C11.7713 4.43764 11.8699 4.73248 11.6989 4.9072L9.05396 7.61076L9.67532 11.4097C9.71572 11.6567 9.45364 11.8417 9.23441 11.7208L5.99983 9.93762Z'
                      fill='url(#paint0_linear_1_7602)'
                    />
                    <defs>
                      <linearGradient
                        id='paint0_linear_1_7602'
                        x1='0.299805'
                        y1='0.29985'
                        x2='0.299805'
                        y2='11.6998'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stopColor='#FFCA11' />
                        <stop offset={1} stopColor='#FFAD27' />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-3 h-3 ' viewBox='0 0 12 12'>
                  <path
                    fill='#e5e7eb'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M5.99983 9.93762L2.76524 11.7208C2.54602 11.8417 2.28393 11.6567 2.32433 11.4097L2.94569 7.61076L0.300721 4.9072C0.129793 4.73248 0.228342 4.43764 0.469974 4.40083L4.11226 3.84584L5.72839 0.411994C5.83648 0.18233 6.16317 0.18233 6.27126 0.411995L7.88739 3.84584L11.5297 4.40083C11.7713 4.43764 11.8699 4.73248 11.6989 4.9072L9.05396 7.61076L9.67532 11.4097C9.71572 11.6567 9.45364 11.8417 9.23441 11.7208L5.99983 9.93762Z'
                  />
                </svg>
              </div>
            </div>
            <div className='ml-2 text-xs '>
              <span>5.66k</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
