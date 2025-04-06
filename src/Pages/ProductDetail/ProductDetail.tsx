import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { ProductApi } from '../../APIs/product.api';
import Rating from '../../components/Rating';
import { formatCurrently, formatSocialStyle, getIdFromNameId } from '../../utils/utils';
import DOMPurify from 'dompurify';
import { useEffect, useMemo, useRef, useState } from 'react';
import Product from '../ProductList/components/Product';
import QuantityController from '../../components/QuantityController';
import { PurchasesApi } from '../../APIs/purchases.api';
import { useQueryClient } from '@tanstack/react-query';
import { purchasesStatus } from '../../constants/purchasesStatus';

export default function ProductDetail() {
  const queryClient = useQueryClient();
  const { nameId } = useParams();
  const id = getIdFromNameId(nameId as string);
  const [activeImage, setActiveImage] = useState<string>();
  const [currentImage, setCurrentImage] = useState([0, 5]);
  const [currentCategory, setCurrentCategory] = useState([0, 5]);
  const [quantity, setQuantity] = useState<string>('1');

  const imageRef = useRef<HTMLImageElement>(null);

  const { data: productResponse } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductApi.getProductDetail(id as string)
  });

  const useMutationPurchase = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => PurchasesApi.addToCart(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchaseList', purchasesStatus.inCart] });
    }
  });

  const product = productResponse?.data.data;

  const { data: categoryResponse } = useQuery({
    queryKey: ['category', product?.category._id],
    queryFn: () => ProductApi.getProducts({ category: product?.category._id as string })
  });

  const category = categoryResponse?.data.data;

  useEffect(() => {
    if (!product) return;
    setActiveImage(product.images[0]);
  }, [product]);

  const handleActiveImage = (img: string) => {
    setActiveImage(img);
  };

  const handleChangeQuantity = (value: string) => {
    setQuantity(value);
  };

  const handleNextButton = (
    item: number[],
    setItem: React.Dispatch<React.SetStateAction<number[]>>,
    conditional: () => boolean
  ) => {
    if (conditional()) {
      setItem(() => [item[0] + 1, item[1] + 1]);
    }
  };

  const handlePreviousButton = (
    item: number[],
    setItem: React.Dispatch<React.SetStateAction<number[]>>,
    conditional: () => boolean
  ) => {
    if (conditional()) {
      setItem(() => [item[0] - 1, item[1] - 1]);
    }
  };

  const arrayImage = useMemo(() => {
    return product ? product.images.slice(...currentImage) : [];
  }, [currentImage, product]);

  const arrayCategory = useMemo(() => {
    if (!category) return [];
    const categoryFilter = category.products.filter((item) => item._id !== product?._id);

    return categoryFilter.slice(...currentCategory);
  }, [currentCategory, category, product?._id]);

  const handleResizeImage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const image = imageRef.current;
    if (!image || !rect) return;
    const { naturalWidth, naturalHeight } = imageRef.current as HTMLImageElement;
    const { offsetX, offsetY } = event.nativeEvent;
    image.style.maxWidth = 'unset';
    image.style.width = `${naturalWidth}px`;
    image.style.height = `${naturalHeight}px`;

    const top = offsetY * (1 - naturalHeight / rect.height);
    const left = offsetX * (1 - naturalWidth / rect.width);

    image.style.transform = `translate(${left}px, ${top}px)`;
  };

  const onMouseOut = () => {
    const image = imageRef.current;
    if (!image) return;
    image.removeAttribute('style');
  };

  const handleAddToCart = () => {
    useMutationPurchase.mutate({ product_id: product?._id as string, buy_count: Number(quantity) || 1 });
  };

  if (!product) return null;
  return (
    <div className='bg-gray-200 border-b-2 border-b-[#ee4d2d] '>
      <div className='container'>
        <div className='grid grid-cols-12 gap-4 bg-white'>
          <div className='col-span-5 px-10 py-5'>
            <div
              className='relative pt-[100%] w-full rounded-sm shadow-sm  overflow-hidden cursor-zoom-in'
              onMouseMove={(event) => {
                handleResizeImage(event);
              }}
              onMouseOut={onMouseOut}
            >
              <img
                src={activeImage}
                alt={product.name}
                className='absolute top-0 left-0 object-cover w-full h-full pointer-events-none'
                ref={imageRef}
              />
            </div>

            <div className='relative grid grid-cols-5 gap-2 mt-2'>
              <button
                className='absolute left-0 z-10 px-2 py-2 -translate-x-1/2 -translate-y-1/2 border bg-gray-200/100 top-1/2'
                onClick={() => {
                  handlePreviousButton(currentImage, setCurrentImage, () => {
                    return Boolean(product && currentImage[0] > 0);
                  });
                }}
              >
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
              {arrayImage.map((item) => {
                const active = activeImage === item;
                return (
                  <div
                    className='col-span-1  relative pt-[100%] rounded-sm shadow-sm cursor-pointer '
                    key={item}
                    onMouseEnter={() => {
                      handleActiveImage(item);
                    }}
                  >
                    <img src={item} alt={product.name} className='absolute top-0 right-0 object-cover w-full h-full ' />
                    {active && <div className='absolute inset-0 border-2 border-[#ee4d2d]'></div>}
                  </div>
                );
              })}
              <button
                className='absolute right-0 z-10 px-2 py-2 translate-x-1/2 -translate-y-1/2 border bg-gray-200/100 top-1/2'
                onClick={() => {
                  handleNextButton(currentImage, setCurrentImage, () =>
                    Boolean(product && currentImage[1] < product.images.length)
                  );
                }}
              >
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
              <div className='flex items-center mt-10 border-r  border-[gray] px-4 pr-10'>
                <span className=' mr-4 border-b border-[black] text-lg'>{product.rating.toFixed(1)}</span>
                <Rating rating={product.rating} />
              </div>
              <div className='flex items-center px-4 mt-10 '>
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

              <QuantityController
                quantity={quantity}
                onType={handleChangeQuantity}
                handleIncrease={handleChangeQuantity}
                handleDecrease={handleChangeQuantity}
                max={product.quantity}
              />
              <div className='flex ml-6 text-gray-500'>
                <div className=''>Hiện có:</div>
                <div className='ml-2 text-[#d0011b]'>{product.quantity}</div>
                <div className='ml-2 text-gray-500'>sản phẩm</div>
              </div>
            </div>
            <div className='flex items-center mt-16'>
              <button className='flex items-center min-h-[60px] border justify-center py-1  px-4 text-[#d0011b] bg-[#d0011b]/10 border-[#d0011b] rounded-sm hover:opacity-70'>
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
                <div className='ml-4' onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </div>
              </button>
              <button className='flex flex-col items-center justify-center min-h-[60px] hover:opacity-70 py-2  px-10 ml-12 text-white bg-[#d0011b]  rounded-sm'>
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
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
        </div>

        <div className='px-2 py-6 my-6 '>
          <div className='mb-6 text-xl font-medium text-gray-500 uppercase'>Sản phẩm tương tự</div>
          <div className='relative grid grid-cols-5 gap-6'>
            {Boolean(category && category.products.length > 5 && currentCategory[0] !== 0) && (
              <button
                className='absolute left-0 z-10 px-2 py-2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md top-1/2'
                onClick={() => {
                  handlePreviousButton(currentCategory, setCurrentCategory, () => {
                    return Boolean(category && currentCategory[0] > 0);
                  });
                }}
              >
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
            )}
            {arrayCategory &&
              arrayCategory.map((product) => {
                return <Product key={product._id} product={product} />;
              })}

            {Boolean(category && currentCategory[1] < category.products.length - 1) && (
              <button
                className='absolute right-0 z-10 px-2 py-2 translate-x-1/2 -translate-y-1/2 bg-white shadow-md top-1/2'
                onClick={() => {
                  handleNextButton(currentCategory, setCurrentCategory, () =>
                    Boolean(category && currentCategory[1] < category.products.length - 1)
                  );
                }}
              >
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
