import { useQuery } from '@tanstack/react-query';
import AsideFilter from './Aside';
import Product from './Product/Product';
import SortProductList from './SortList';
import { ProductApi } from '../../APIs/product.api';
import { useSearchParam } from '../../hooks/useQueryParams';
import Pagination from '../../components/Pagination';
import { ProductConfig } from '../../types/products';
import { omitBy, isUndefined } from 'lodash';

export type QueryConfig = {
  [key in keyof ProductConfig]?: string;
};

export default function ProductList() {
  const searchParam = useSearchParam();
  const queryConfig: QueryConfig = omitBy(
    {
      page: searchParam.page || '1',
      limit: searchParam.limit,
      order: searchParam.order,
      sort_by: searchParam.sort_by,
      category: searchParam.category,
      exclude: searchParam.exclude,
      rating_filter: searchParam.rating_filter,
      price_max: searchParam.price_max,
      price_min: searchParam.price_min,
      name: searchParam.name
    },
    isUndefined
  );

  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => ProductApi.getProducts(queryConfig as ProductConfig),
    placeholderData: (previousData) => previousData
    // Giữ phần data trước cho đến khi data mới load xong,tránh hiện trạng data -> null -> data mới,khi từ null -> data mới sẽ gây dật layout
  });
  return (
    <div className='py-2 pb-11 border-b-[#ee4d2d] border-b-[2px] bg-[#f5f5f5]'>
      <div className='container'>
        {data && (
          <div className='grid grid-cols-12 gap-4'>
            <AsideFilter />
            <div className='col-span-10'>
              <SortProductList />
              <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {data?.data.data?.products.map((product) => <Product key={product._id} product={product} />)}
              </div>

              <Pagination size={data.data.data.pagination.page_size} queryConfig={queryConfig} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
