import { useQuery } from '@tanstack/react-query';
import { purchasesStatus } from '../../constants/purchasesStatus';
import { PurchasesApi } from '../../APIs/purchases.api';
import { formatCurrently } from '../../utils/utils';
import QuantityController from '../../components/QuantityController';
import Button from '../../components/Button';
import React, { useEffect, useMemo, useState } from 'react';
import { Purchases } from '../../types/purchases';

interface PurchasesState extends Purchases {
  enable: boolean;
  checked: boolean;
}

export default function Cart() {
  const { data: purchasesRes } = useQuery({
    queryKey: ['purchaseList', purchasesStatus.inCart],
    queryFn: () => PurchasesApi.getPurchases({ status: purchasesStatus.inCart })
  });
  const [purchaseState, setPurchaseState] = useState<PurchasesState[]>([]);

  const purchases = purchasesRes?.data.data;

  useEffect(() => {
    if (!purchases) return;
    const purchasesList = purchases.map((item) => {
      return { ...item, enable: false, checked: false };
    });
    setPurchaseState(purchasesList);
  }, [purchases]);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { checked } = e.target;
    setPurchaseState((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          return { ...item, checked: checked };
        }
        return item;
      });
    });
  };

  const activeChecked = useMemo(() => {
    return purchaseState.every((item) => item.checked);
  }, [purchaseState]);

  const numberChecked = useMemo(() => {
    return purchaseState.filter((item) => item.checked).length;
  }, [purchaseState]);

  const handleCheckedAll = () => {
    if (activeChecked) {
      setPurchaseState((prev) => {
        return prev.map((item) => {
          return { ...item, checked: false };
        });
      });
    } else {
      setPurchaseState((prev) => {
        return prev.map((item) => {
          return { ...item, checked: true };
        });
      });
    }
  };

  if (!purchases) {
    return null;
  }
  return (
    <div className='bg-[#f5f5f5] border-b-2 border-b-[#fb5533] '>
      <div className='container'>
        <div className='py-4'>
          <div className='overflow-x-auto '>
            <div className='w-[1245px]'>
              <div className='p-6 bg-white rounded-sm shadow-sm'>
                <div className='grid grid-cols-12 text-gray-500 capitalize'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <input
                        type='checkbox'
                        className=' accent-[#fb5533] w-4 h-4 hover:cursor-pointer'
                        onChange={handleCheckedAll}
                        checked={activeChecked}
                      />
                      <div className='ml-8'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='grid grid-cols-6 col-span-6 text-center'>
                    <div className='col-span-2 '>Đơn giá</div>
                    <div className='col-span-2'>Số lượng</div>
                    <div className='col-span-1'>Số tiền</div>
                    <div className='col-span-1'>Thao tác</div>
                  </div>
                </div>
              </div>
              <div className='pt-6 pb-4 mt-4 bg-white rounded-sm shadow-sm'>
                <div className='py-4 mb-2 ml-6 text-xl'>Danh sách giỏ hàng</div>

                {purchaseState.map((purchaseItem) => {
                  return (
                    <div className=' border-b border-[#e5e7eb] p-6' key={purchaseItem._id}>
                      <div className='grid grid-cols-12 '>
                        <div className='col-span-6'>
                          <div className='flex items-center'>
                            <input
                              type='checkbox'
                              className=' accent-[#fb5533] w-4 h-4 flex-shrink-0 hover:cursor-pointer'
                              checked={purchaseItem.checked}
                              onChange={(event) => handleChecked(event, purchaseItem._id)}
                            />
                            <div className='object-cover w-12 h-12 ml-8'>
                              <img
                                src={purchaseItem.product.image}
                                className='w-full h-full'
                                alt={purchaseItem.product.name}
                              />
                            </div>
                            <div className='ml-4 text-sm'>{purchaseItem.product.name}</div>
                          </div>
                        </div>
                        <div className='grid grid-cols-6 col-span-6 text-center'>
                          <div className='flex items-center justify-center col-span-2'>
                            <div className='text-gray-500 line-through'>
                              ₫{formatCurrently(purchaseItem.price_before_discount)}
                            </div>
                            <div className='ml-2'>₫{formatCurrently(purchaseItem.price)}</div>
                          </div>
                          <div className='flex items-center justify-center col-span-2'>
                            <QuantityController
                              quantity={purchaseItem.buy_count.toString()}
                              max={purchaseItem.product.quantity}
                            />
                          </div>
                          <div className='col-span-1 text-[#fb5533] flex items-center justify-center'>
                            ₫{formatCurrently(purchaseItem.price * purchaseItem.buy_count)}
                          </div>
                          <button className='flex items-center justify-center col-span-1 hover:text-[#fb5533]'>
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='sticky bottom-0 z-10 p-6 mt-10 bg-white rounded-sm border-t border-[#e5e7eb]'>
            <div className='grid grid-cols-12'>
              <div className='flex items-center col-span-6'>
                <input
                  type='checkbox'
                  className=' accent-[#fb5533] w-4 h-4 hover:cursor-pointer flex-shrink-0'
                  checked={activeChecked}
                  onChange={handleCheckedAll}
                />
                <button className='ml-4 hover:cursor-pointer hover:text-[#fb5533] ' onClick={handleCheckedAll}>
                  Chọn tất cả ({numberChecked} sản phẩm)
                </button>
                <button className='ml-4 hover:cursor-pointer hover:text-[#fb5533]'>Xóa</button>
              </div>
              <div className='flex items-center justify-end col-span-6'>
                <span className='mr-4 '>Tổng cộng ({purchaseState.length} Sản phẩm): </span>
                <span className='text-2xl text-[#fb5533] mr-8'>₫100</span>
                <Button
                  className='h-full bg-[#ee4d2d] px-12 py-4  rounded-sm shadow-sm capitalize text-white hover:opacity-90'
                  content='Mua hàng'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
