import { Link } from 'react-router';
import { ProductDetail } from '../../../types/products';
import { formatCurrently, formatSocialStyle } from '../../../utils/utils';
import ProductRating from '../../../components/Rating';

type PropsType = {
  product: ProductDetail;
};

export default function Product({ product }: PropsType) {
  return (
    <Link to={'/'}>
      <div
        className='bg-white rounded-sm shadow-lg hover:translate-y-[-.25rem] hover:shadow-md duration-100
      transition-transform overflow-hidden min-h-8'
      >
        <div className='w-full pt-[100%] relative '>
          <img src={product.image} alt={product.name} className='absolute top-0 left-0 object-cover w-full h-full' />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[1.75rem] text-sm line-clamp-2'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='text-sm text-gray-300 line-through'>
              <span className='text-xs'>đ</span>
              <span>{formatCurrently(product.price)}</span>
            </div>
            <div className='ml-2 text-base text-[#ee4d2d]'>
              <span className='text-sm'>đ</span>
              <span>{formatCurrently(product.price_before_discount)}</span>
            </div>
          </div>
          <div className='flex items-center justify-end mt-2 mb-2 '>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-xs '>
              <span>{formatSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
