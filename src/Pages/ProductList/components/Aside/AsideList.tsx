import { createSearchParams, Link, useNavigate } from 'react-router';
import path from '../../../../constants/path';
import { QueryConfig } from '../../ProductList';
import { Categories } from '../../../../types/categories';
import InputNumber from '../../../../components/InputNumber';
import Button from '../../../../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inputPriceSchema, typeOfInputPrice } from '../../../../utils/zod';
import { NoUndefined } from '../../../../types/ultils';
import RatingFilter from '../RatingFilter';
import { omit } from 'lodash';

interface AsideFilterProps {
  queryConfig: QueryConfig;
  dataCategories: Categories[];
}

type InputForm = NoUndefined<typeOfInputPrice>;

export default function AsideFilter({ dataCategories, queryConfig }: AsideFilterProps) {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: error
  } = useForm<InputForm>({
    resolver: zodResolver(inputPriceSchema),
    defaultValues: { from: '', to: '' }
  });

  const handleReset = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...omit(queryConfig, ['rating_filter', 'category', 'price_min', 'price_max'])
      }).toString()
    });
  };

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.from,
        price_max: data.to
      }).toString()
    });
  });

  const { category } = queryConfig;
  return (
    <div className='col-span-2 '>
      <div className='mx-2'>
        <div className='mt-10'>
          <Link
            to={path.home}
            className={`flex items-center gap-2 mb-4 font-bold ${category === undefined ? 'text-[#ee4d2d]' : ''}`}
          >
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-6 h-6'>
              <g id='SVGRepo_bgCarrier' strokeWidth={0} />
              <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
              <g id='SVGRepo_iconCarrier'>
                <path
                  d='M8 8H20M11 12H20M14 16H20M4 8H4.01M7 12H7.01M10 16H10.01'
                  stroke='currentColor'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
            </svg>
            <div>Tất cả danh mục</div>
          </Link>
          <div className='h-[1px] mx-4 mb-2 bg-gray-300' />
          <ul className='ml-4 text-sm'>
            {dataCategories.length > 0 &&
              dataCategories.map((categoryItem) => (
                <li className='mb-2' key={categoryItem._id}>
                  <Link
                    to={{
                      pathname: path.home,
                      search: createSearchParams({ ...queryConfig, category: categoryItem._id }).toString()
                    }}
                    className={`${category === categoryItem._id ? 'relative flex items-center font-semibold text-[#ee4d2d]' : ''} `}
                  >
                    <svg
                      fill='currentColor'
                      version='1.1'
                      id='Layer_1'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      viewBox='0 0 24 24'
                      xmlSpace='preserve'
                      className='absolute left-[-12px] w-4 h-4'
                      display={category === categoryItem._id ? 'block' : 'none'}
                    >
                      <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
                      <g id='SVGRepo_iconCarrier'>
                        <style type='text/css' dangerouslySetInnerHTML={{ __html: ' .st0{fill:none;} ' }} />
                        <path d='M9,18l7-6L9,6V18z' /> <rect className='st0' width={24} height={24} />
                        <rect className='st0' width={24} height={24} />
                      </g>
                    </svg>
                    <div className='ml-3'>{categoryItem.name}</div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className='mt-10 '>
          <Link to={path.home} className='flex items-center gap-2 mb-4 font-bold uppercase'>
            <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className='w-4 h-5'>
              <g>
                <polyline
                  // fill='none'
                  points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={2}
                />
              </g>
            </svg>
            <div>Bộ Lọc Tìm Kiếm</div>
          </Link>
          <div className='h-[1px] mx-2 mb-2 bg-gray-300' />

          <div className='my-5'>
            <form onSubmit={onSubmit}>
              <div className='mb-2 ml-2'>Khoảng giá</div>
              <div className='flex items-center gap-2 ml-2 text-sm font-normal'>
                <Controller
                  control={control}
                  name='from'
                  render={({ field }) => (
                    <InputNumber
                      className='relative'
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      value={field.value}
                      type='text'
                      placeholder='₫ TỪ'
                      classNameInput='h-8 border border-gray-300 outline-none w-20 p-2'
                      ref={field.ref}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name='to'
                  render={({ field }) => (
                    <InputNumber
                      className='relative'
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      value={field.value}
                      type='text'
                      classNameInput='h-8 border border-gray-300 outline-none w-20 p-2'
                      placeholder='₫ ĐẾN'
                      ref={field.ref}
                    />
                  )}
                />

                <div className='w-3 h-[2px] bg-gray-300' />
              </div>
              <div className='mt-4 text-xs text-center text-red-500 min-h-4 button-0'>{error.errors.to?.message}</div>
              <Button
                content='áp dụng'
                className='px-4 mt-2 ml-1 py-2 uppercase bg-[#ee4d2d] text-white text-xl rounded-sm shadow-sm w-full'
              />
            </form>
          </div>
        </div>
        <div className='h-[1px] mx-4 mb-2 bg-gray-300' />
        <div className='my-6 font-light'>
          <div className='mb-4 ml-2'>Đánh giá</div>
          <RatingFilter queryConfig={queryConfig} />
        </div>
        <Button
          handleReset={handleReset}
          content='Xóa tất cả'
          className='px-4 mt-2 ml-1 py-2 uppercase bg-[#ee4d2d] text-white text-lg rounded-sm shadow-sm w-full'
        />
      </div>
    </div>
  );
}
