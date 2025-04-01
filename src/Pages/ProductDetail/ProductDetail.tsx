import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { ProductApi } from '../../APIs/product.api';
import Rating from '../../components/Rating';
import { formatCurrently, formatSocialStyle } from '../../utils/utils';
import InputNumber from '../../components/InputNumber';

export default function ProductDetail() {
  const isActive = true;
  const { id } = useParams();
  const { data: productResponse } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductApi.getProductDetail(id as string)
  });
  const product = productResponse?.data.data;
  console.log(product);
  if (!product) return null;
  return (
    <div className='bg-gray-200 border-b-2 border-b-[#ee4d2d] '>
      <div className='container'>
        <div className='grid grid-cols-12 gap-4 bg-white'>
          <div className='col-span-5 px-10 py-5'>
            <div className='relative pt-[100%] w-full rounded-sm shadow-sm'>
              <img
                src={product.image}
                alt={product.name}
                className='absolute top-0 left-0 object-cover w-full h-full'
              />
            </div>
            <div className='relative grid grid-cols-5 gap-2 mt-2'>
              <button className='absolute left-0 z-10 px-2 py-2 -translate-x-1/2 -translate-y-1/2 border bg-gray-200/100 top-1/2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1'
                  stroke='currentColor'
                  className='size-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </button>
              {product.images.slice(0, 5).map((item) => (
                <div className={`${isActive ? 'border-2 border-[#ee4d2d]' : ''} cursor-pointer`} key={item}>
                  <div className='col-span-1  relative pt-[100%] rounded-sm shadow-sm '>
                    <img src={item} alt={product.name} className='absolute top-0 right-0 object-cover w-full h-full' />
                  </div>
                </div>
              ))}
              <button className='absolute right-0 z-10 px-2 py-2 translate-x-1/2 -translate-y-1/2 border bg-gray-200/100 top-1/2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1'
                  stroke='currentColor'
                  className='size-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>
          <div className='col-span-7 px-4 py-6'>
            <h1 className='mt-4 text-2xl font-medium'>{product.name}</h1>
            <div className='flex items-center'>
              <div className='flex items-center mt-10 border-r w-500px border-[gray] px-4 pr-10'>
                <span className=' mr-4 border-b border-[black] text-lg'>{product.rating.toFixed(1)}</span>
                <Rating rating={product.rating} />
              </div>
              <div className='flex items-center px-4 mt-10 w-500px '>
                <span className='ml-4 mr-2 border-b border-[black] text-lg'>{formatSocialStyle(product.sold)} </span>
                <span className='text-sm text-gray-500 '>Sold</span>
              </div>
            </div>
            <div className='w-full bg-[#ee4d2d]/10  mt-6 px-4 py-6  flex items-center '>
              <div>
                <span className='text-3xl text-[#d0011b]'>₫</span>
                <span className='text-3xl text-[#d0011b]'>{formatCurrently(product.price)}</span>
              </div>
              <div className='ml-4 text-lg font-medium text-gray-500 line-through'>
                <div>
                  <span>₫</span>
                  <span> {formatCurrently(product.price_before_discount)}</span>
                </div>
              </div>
            </div>

            <div className='flex items-center mt-20'>
              <div className='mr-6 text-gray-500'>Số lượng</div>
              <button className='w-10 h-10 border rounded-l-sm border-r-0 border-[#d0011b] flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                </svg>
              </button>
              <InputNumber
                value='1'
                className='w-16 h-10 border border-[#d0011b]'
                classNameInput='text-[#d0011b] w-full h-full border-none outline-none text-center'
              />
              <button className='w-10 h-10 border  border-l-0 border-[#d0011b] rounded-r-sm flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                </svg>
              </button>
            </div>
            <div className='flex items-center mt-16'>
              <button className='flex items-center min-h-[60px] border justify-center py-1  px-4 text-[#d0011b] bg-[#d0011b]/10 border-[#d0011b] rounded-sm'>
                <span>
                  <svg xmlns='http://www.w3.org/2000/svg' width={15} height={15} fill='#d0011b' stroke='#d0011b'>
                    <path
                      fill='none'
                      strokeLinecap='round'
                      strokeMiterlimit={10}
                      d='M.5.5h2.2L5.2 11h7.2l2.1-7.5H3.7'
                    />
                    <circle cx={6} cy='13.5' r={1} stroke='none' />
                    <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                    <path fill='none' strokeLinecap='round' strokeMiterlimit={10} d='M7.5 7h3M9 8.5v-3' />
                  </svg>
                </span>
                <div className='ml-4'>Thêm vào giỏ hàng</div>
              </button>
              <button className='flex flex-col items-center justify-center min-h-[60px]  py-2  px-10 ml-12 text-white bg-[#d0011b]  rounded-sm'>
                <div>Mua với voucher</div>
                <div className='flex justify-center ml-4 text-xl font-normal item-center'>
                  <span>₫</span>
                  <span>{formatCurrently(product.price)}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className='px-10 py-6 my-6 bg-white'>
          <div className='mt-10 mb-4 text-xl'>Mô tả sản phẩm</div>
          <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>
      </div>
    </div>
  );
}
