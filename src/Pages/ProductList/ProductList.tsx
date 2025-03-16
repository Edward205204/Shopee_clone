import { useQuery } from '@tanstack/react-query';
import AsideFilter from './Aside';
import Product from './Product/Product';
import SortProductList from './SortList';
import { ProductApi } from '../../APIs/product.api';
import { useSearchParam } from '../../hooks/useQueryParams';

export default function ProductList() {
  const searchParam = useSearchParam();
  const { data } = useQuery({
    queryKey: ['products', searchParam],
    queryFn: () => ProductApi.getProducts(searchParam)
  });
  console.log(data?.data.data?.products);
  return (
    <div className='py-2 pb-11 border-b-[#ee4d2d] border-b-[2px] bg-[#f5f5f5]'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-4'>
          <AsideFilter />
          <div className='col-span-10'>
            <SortProductList />
            <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {/* {Array(10)
                .fill(0)
                .map((_, index) => (
                  <Product key={index} />
                ))} */}
              {data && data?.data.data?.products.map((product) => <Product key={product._id} product={product} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
