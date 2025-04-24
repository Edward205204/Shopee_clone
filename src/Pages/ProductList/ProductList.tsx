import { useQuery } from '@tanstack/react-query';
import AsideFilter from './components/Aside';
import Product from './components/Product/Product';
import SortProductList from './components/SortList';
import { ProductApi } from '../../APIs/product.api';
import Pagination from '../../components/Pagination';
import { ProductConfig } from '../../types/products';
import { getCategories } from '../../APIs/categories.api';
import { createSearchParams, useNavigate } from 'react-router';
import path from '../../constants/path';
import { useEffect } from 'react';
import { useQueryConfig } from '../../hooks/useQueryConfig';
import { Helmet } from 'react-helmet-async';

export type QueryConfig = {
  [key in keyof ProductConfig]?: string;
};

export default function ProductList() {
  const navigate = useNavigate();
  const queryConfig = useQueryConfig();

  const { data: dataProducts } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => ProductApi.getProducts(queryConfig as ProductConfig),
    placeholderData: (previousData) => previousData
    // Giữ phần data trước cho đến khi data mới load xong,tránh hiện trạng data -> null -> data mới,khi từ null -> data mới sẽ gây dật layout
  });

  useEffect(() => {
    if (queryConfig.page && dataProducts && parseInt(queryConfig.page) > dataProducts.data.data.pagination.page_size) {
      navigate({
        pathname: path.home,
        search: createSearchParams({ ...queryConfig, page: '1' }).toString()
      });
    }
  }, [queryConfig, dataProducts, navigate]);

  const { data: dataCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  });

  return (
    <div className='py-2 pb-11 border-b-[#ee4d2d] border-b-[2px] bg-[#f5f5f5]'>
      <Helmet>
        <title>Danh Sách Sản Phẩm | Shopee Clone</title>
        <meta name='description' content='Danh sách các sản phẩm' />
      </Helmet>
      <div className='container'>
        {dataProducts && (
          <div className='grid grid-cols-12 gap-4'>
            <AsideFilter dataCategories={dataCategories?.data.data || []} queryConfig={queryConfig} />
            <div className='col-span-10'>
              <SortProductList queryConfig={queryConfig} pageSize={dataProducts.data.data.pagination.page_size} />
              <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {dataProducts?.data.data?.products.map((product) => <Product key={product._id} product={product} />)}
              </div>
              <Pagination size={dataProducts.data.data.pagination.page_size} queryConfig={queryConfig} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
