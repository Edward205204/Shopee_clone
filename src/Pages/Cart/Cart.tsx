import { useIsMutating, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { purchasesStatus } from '../../constants/purchasesStatus';
import { PurchasesApi } from '../../APIs/purchases.api';
import { formatCurrently } from '../../utils/utils';
import QuantityController from '../../components/QuantityController';
import Button from '../../components/Button';
import React, { useEffect, useMemo, useState } from 'react';
import { Purchases } from '../../types/purchases';
import { produce } from 'immer';
import { toast } from 'react-toastify';

interface PurchasesState extends Purchases {
  disabled: boolean;
  checked: boolean;
}

export default function Cart() {
  // Dùng useIsMutating để kiểm tra xem có mutation nào đang diễn ra hay không
  const isMutating = useIsMutating();

  const queryClient = useQueryClient();
  const { data: purchasesRes } = useQuery({
    queryKey: ['purchaseList', purchasesStatus.inCart],
    queryFn: () => PurchasesApi.getPurchases({ status: purchasesStatus.inCart })
  });
  const [purchaseState, setPurchaseState] = useState<PurchasesState[]>([]);

  const useMutationCart = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => PurchasesApi.updatePurchases(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchaseList', purchasesStatus.inCart] });
    }
  });

  const useMutationBuyCart = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }[]) => PurchasesApi.buyPurchases(body),
    onSuccess: (body) => {
      queryClient.invalidateQueries({ queryKey: ['purchaseList', purchasesStatus.inCart] });
      toast.success(body.data.message);
    }
  });

  const useMutationDelete = useMutation({
    mutationFn: (body: string[]) => PurchasesApi.deletePurchases([...body]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchaseList', purchasesStatus.inCart] });
    }
  });

  const purchases = purchasesRes?.data.data;

  useEffect(() => {
    /**
   *  Tạo Map mới từ danh sách sản phẩm trước đó
        key là id của mỗi item,và value là item đó
        duyệt qua purchases được fetch lại, kiểm tra item cũ đã có chưa bằng cách get(id của purchase mới) vào Map mới được tạo bằng id
        nếu đã có trong Map tức có đc checked ròi thì không cần tạo lại checked nữa
        nếu chưa có thì checked = false disabled = false
   */
    if (purchases) {
      setPurchaseState((prev) => {
        const prevPurchaseState = new Map(prev.map((p) => [p._id, p]));
        return purchases.map((item) => {
          const oldItem = prevPurchaseState.get(item._id);
          return oldItem
            ? { ...item, checked: oldItem.checked, disabled: false }
            : { ...item, checked: false, disabled: false };
        });
      });
    }
  }, [purchases]);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>, itemIndex: number) => {
    const { checked } = e.target;
    setPurchaseState(
      produce(purchaseState, (draft) => {
        draft[itemIndex].checked = checked;
      })
    );
  };

  const isAllChecked = useMemo(() => {
    if (purchaseState.length === 0) return false;
    return purchaseState.every((item) => item.checked);
  }, [purchaseState]);

  const checkedList = useMemo(() => {
    return purchaseState
      .filter((item) => item.checked)
      .map((item) => item._id)
      .map((item) => {
        const itemPurchase = purchaseState.find((purchaseItem) => purchaseItem._id === item);
        if (!itemPurchase) return null;
        return { product_id: itemPurchase.product._id, buy_count: itemPurchase?.buy_count };
      });
  }, [purchaseState]);

  const handleCheckedAll = () => {
    setPurchaseState((prev) => {
      return prev.map((item) => {
        return { ...item, checked: !isAllChecked };
      });
    });
  };

  const handleDeleteCart = (id: string[]) => {
    if (id.length === 0) {
      toast.error('Vui lòng chọn sản phẩm để xóa');
      return;
    }
    useMutationDelete.mutate(id);
  };

  const handleChangeQuantity = (id: string, quantity: string) => {
    setPurchaseState((prev) =>
      produce(prev, (draft) => {
        draft.forEach((item) => {
          item.disabled = true;
          if (item._id === id) {
            item.buy_count = Number(quantity);
          }
        });
      })
    );

    useMutationCart.mutate({ product_id: id, buy_count: Number(quantity) });
  };

  const handleOnType = (id: string) => (value: string) => {
    setPurchaseState(
      produce(purchaseState, (draft) => {
        const item = draft.find((item) => item._id === id);
        if (item) {
          item.buy_count = Number(value);
        }
      })
    );
  };

  const handleBlur = (id: string) => (value: string) => {
    setPurchaseState((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          return { ...item, disabled: true };
        }
        return { ...item, disabled: true };
      });
    });

    useMutationCart.mutate({ product_id: id, buy_count: Number(value) });
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
                        checked={isAllChecked}
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

                {purchaseState.map((purchaseItem, index) => {
                  return (
                    <div className=' border-b border-[#e5e7eb] p-6' key={purchaseItem._id}>
                      <div className='grid grid-cols-12 '>
                        <div className='col-span-6'>
                          <div className='flex items-center'>
                            <input
                              type='checkbox'
                              className=' accent-[#fb5533] w-4 h-4 flex-shrink-0 hover:cursor-pointer'
                              checked={purchaseItem.checked}
                              onChange={(event) => handleChecked(event, index)}
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
                              disableStyle={isMutating ? 'opacity-50 cursor-not-allowed' : ''}
                              disabled={purchaseItem.disabled}
                              quantity={purchaseItem.buy_count.toString()}
                              max={purchaseItem.product.quantity}
                              onType={handleOnType(purchaseItem.product._id)}
                              handleIncrease={() => {
                                handleChangeQuantity(purchaseItem.product._id, (purchaseItem.buy_count + 1).toString());
                              }}
                              handleDecrease={() => {
                                handleChangeQuantity(purchaseItem.product._id, (purchaseItem.buy_count - 1).toString());
                              }}
                              onBlurMutation={handleBlur(purchaseItem.product._id)}
                            />
                          </div>
                          <div className='col-span-1 text-[#fb5533] flex items-center justify-center'>
                            ₫{formatCurrently(purchaseItem.price * purchaseItem.buy_count)}
                          </div>
                          <button
                            className='flex items-center justify-center col-span-1 hover:text-[#fb5533]'
                            onClick={() => {
                              handleDeleteCart([purchaseItem._id]);
                            }}
                          >
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
                  checked={isAllChecked}
                  onChange={handleCheckedAll}
                />
                <button className='ml-4 hover:cursor-pointer hover:text-[#fb5533] ' onClick={handleCheckedAll}>
                  Chọn tất cả ({purchaseState.length} sản phẩm)
                </button>
                <button
                  className='ml-4 hover:cursor-pointer hover:text-[#fb5533]'
                  onClick={() => {
                    const idList = purchaseState.map((item) => {
                      return item._id;
                    });
                    handleDeleteCart(idList);
                  }}
                >
                  Xóa
                </button>
              </div>
              <div className='flex items-center justify-end col-span-6'>
                <span className='mr-4 '>Tổng cộng ({checkedList.length} Sản phẩm): </span>
                <span className='text-2xl text-[#fb5533] mr-8'>₫{formatCurrently(12)}</span>
                <Button
                  handleSubmit={() => {
                    if (checkedList.length === 0 || isMutating) {
                      toast.error('Vui lòng chọn sản phẩm để mua');
                      return;
                    }
                    useMutationBuyCart.mutate(checkedList as { product_id: string; buy_count: number }[]);
                  }}
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
