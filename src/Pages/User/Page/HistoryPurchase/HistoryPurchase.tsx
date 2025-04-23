import { createSearchParams, Link } from 'react-router';
import path from '../../../../constants/path';
import { useQueryConfig } from '../../../../hooks/useQueryConfig';
import { purchasesStatus } from '../../../../constants/purchasesStatus';
import { useSearchParam } from '../../../../hooks/useQueryParams';
import { useQuery } from '@tanstack/react-query';
import { ProductApi } from '../../../../APIs/product.api';
import { ProductConfig } from '../../../../types/products';
import { formatCurrently, generateNameId } from '../../../../utils/utils';

const linkList = [
  {
    name: 'Giỏ hàng',
    status: purchasesStatus.inCart
  },
  {
    name: 'Tất cả',
    status: purchasesStatus.all
  },
  {
    name: 'Chờ xác nhận',
    status: purchasesStatus.waitForConfirmation
  },
  {
    name: 'Đang giao',
    status: purchasesStatus.waitForGetting
  },
  {
    name: 'Đang xử lý',
    status: purchasesStatus.inProgress
  },
  {
    name: 'Đã giao',
    status: purchasesStatus.delivered
  },
  {
    name: 'Đã hủy',
    status: purchasesStatus.cancelled
  }
];

export default function HistoryPurchase() {
  const params = useSearchParam();

  const { data: dataRes } = useQuery({
    queryKey: ['products', params.status],
    queryFn: () => ProductApi.getProducts({ status: params.status } as ProductConfig),
    placeholderData: (previousData) => previousData
  });

  const dataProducts = dataRes?.data.data.products;
  console.log(dataProducts);

  const headerList = linkList.map((item) => (
    <Link
      key={item.status}
      className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
        params.status === item.status
          ? 'text-[#ee4d2d] border-b-2 border-[#ee4d2d]'
          : 'text-gray-500 hover:text-gray-700'
      }`}
      to={{
        pathname: path.purchase_history,
        search: createSearchParams({ ...useQueryConfig, status: item.status }).toString()
      }}
    >
      {item.name}
    </Link>
  ));

  return (
    <div className='container px-4 py-8 mx-auto'>
      {/* Navigation tabs */}
      <div className='flex pb-2 mb-6 overflow-x-auto scrollbar-hide'>
        <div className='flex space-x-6'>{headerList}</div>
      </div>

      {/* Purchase list */}
      {dataProducts && dataProducts.length > 0 ? (
        <div className='overflow-hidden bg-white rounded-lg shadow-sm'>
          {dataProducts.map((purchaseItem) => (
            <Link
              key={purchaseItem._id}
              to={`${path.home}${generateNameId({ name: purchaseItem.name, id: purchaseItem._id })}`}
              className='block'
            >
              <div className='p-4 transition-colors duration-150 border-b border-gray-100 last:border-b-0 hover:bg-gray-50'>
                <div className='flex items-center'>
                  {/* Product image */}
                  <div className='flex-shrink-0 w-16 h-16 overflow-hidden rounded-md'>
                    <img src={purchaseItem.image} alt={purchaseItem.name} className='object-cover w-full h-full' />
                  </div>

                  {/* Product info */}
                  <div className='flex-1 min-w-0 ml-4'>
                    <h3 className='text-sm font-medium text-gray-900 truncate'>{purchaseItem.name}</h3>
                    <div className='flex items-center mt-1'>
                      <span className='text-sm font-medium text-gray-900'>₫{formatCurrently(purchaseItem.price)}</span>
                      {purchaseItem.price_before_discount > purchaseItem.price && (
                        <span className='ml-2 text-xs text-gray-500 line-through'>
                          ₫{formatCurrently(purchaseItem.price_before_discount)}
                        </span>
                      )}
                    </div>
                    {/* Quantity and Total Price */}
                    <div className='flex items-center mt-2 space-x-4'>
                      <span className='text-sm text-gray-500'>Số lượng: {purchaseItem.quantity || 1}</span>
                      <span className='text-sm font-medium text-[#ee4d2d]'>
                        Tổng: ₫{formatCurrently((purchaseItem.price || 0) * (purchaseItem.quantity || 1))}
                      </span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className='ml-4'>
                    <span className='px-2 py-1 text-xs font-medium text-[#ee4d2d] bg-blue-100 rounded-full'>
                      {params.status || 'Đang xử lý'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='py-12 text-center'>
          <div className='text-gray-500'>Không có đơn hàng nào</div>
        </div>
      )}
    </div>
  );
}
