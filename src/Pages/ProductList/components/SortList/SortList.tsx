import { createSearchParams, useNavigate } from 'react-router';
import { order as orderConst, sortBy } from '../../../../constants/product';
import { ProductConfig } from '../../../../types/products';
import { QueryConfig } from '../../ProductList';
import path from '../../../../constants/path';
import { omit } from 'lodash';

interface AsideFilterProps {
  queryConfig: QueryConfig;
  pageSize: number;
}

export default function SortProductList({ queryConfig, pageSize }: AsideFilterProps) {
  const navigate = useNavigate();
  const { sort_by = sortBy.createdAt, order, page } = queryConfig;
  const isSortByActive = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => sort_by === sortByValue;
  const handleSortBy = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue.toString()
          },
          ['order']
        )
      ).toString()
    });
  };

  const handlePriceOrder = (order: Exclude<ProductConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: order.toString()
      }).toString()
    });
  };

  const handlePagination = (page: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        page: page.toString()
      }).toString()
    });
  };

  return (
    <div className='flex items-center justify-between px-4 py-3 my-5 mt-10 bg-gray-200 rounded-sm'>
      <div className='flex items-center '>
        <div className='mr-4 text-sm'>Sắp xếp theo</div>
        <button
          onClick={() => handleSortBy(sortBy.view)}
          className={`px-6 py-3 ml-4 rounded-sm  ${isSortByActive(sortBy.view) ? 'bg-[#ee4d2d] text-white' : 'bg-white'}`}
        >
          Phổ biến
        </button>
        <button
          onClick={() => handleSortBy(sortBy.createdAt)}
          className={`px-6 py-3 ml-4 rounded-sm  ${isSortByActive(sortBy.createdAt) ? 'bg-[#ee4d2d] text-white' : 'bg-white'}`}
        >
          Mới nhất
        </button>
        <button
          onClick={() => handleSortBy(sortBy.sold)}
          className={`px-6 py-3 ml-4 rounded-sm  ${isSortByActive(sortBy.sold) ? 'bg-[#ee4d2d] text-white' : 'bg-white'}`}
        >
          Bán chạy
        </button>

        <select
          className={`px-3 py-3 pr-2 ml-4 text-left  rounded-sm outline-none  ${isSortByActive(sortBy.price) ? 'bg-[#ee4d2d] text-white' : 'bg-white'}`}
          value={sort_by === sortBy.price ? order : ''}
          onChange={(event) => {
            handlePriceOrder(event.target.value as Exclude<ProductConfig['order'], undefined>);
          }}
        >
          <option value='' className='hidden' disabled>
            Giá
          </option>
          <option value={orderConst.asc} className='text-black bg-white'>
            Giá: Thấp đến cao
          </option>
          <option value={orderConst.desc} className='text-black bg-white'>
            Giá: Cao đến thấp
          </option>
        </select>
      </div>
      <div className='flex items-center'>
        <span className='text-base text-[#ee4d2d]'>{page}</span>
        <span className='text-base'>/{pageSize}</span>
        <button
          className={`p-2 ml-2 rounded-sm bg-white   ${page === '1' ? 'bg-white/60 cursor-not-allowed' : 'hover:bg-slate-100'}`}
          disabled={(parseInt(page || '1') || 1) === 1}
          onClick={() => handlePagination((parseInt(page || '1') || 1) - 1)}
        >
          <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5'>
            <path d='M17 5l-7 7 7 7' stroke='currentColor' strokeWidth={1} />
          </svg>
        </button>
        <button
          className={`p-2 ml-2 rounded-sm bg-white   ${page === pageSize.toString() ? 'bg-white/60 cursor-not-allowed' : 'hover:bg-slate-100'}`}
          disabled={page === pageSize.toString()}
          onClick={() => handlePagination((parseInt(page || '1') || 1) + 1)}
        >
          <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5'>
            <path d='M7 5l7 7-7 7' stroke='currentColor' strokeWidth={1} />
          </svg>
        </button>
      </div>
    </div>
  );
}
