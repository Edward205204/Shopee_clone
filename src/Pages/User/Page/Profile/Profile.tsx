import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { TypUserProfileSchema, userProfileSchema } from '../../../../utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputNumber from '../../../../components/InputNumber';
import SelectDay from '../../components/SelectDay';
import { useMutation, useQuery } from '@tanstack/react-query';
import { profileApi } from '../../../../APIs/profile.api';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

type FormData = Pick<TypUserProfileSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>;

const profileSchema = userProfileSchema.pick({
  name: true,
  address: true,
  phone: true,
  date_of_birth: true,
  avatar: true
});

export default function Profile() {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
    register
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: ''
    }
  });

  const [file, setFile] = useState<File>();
  const inputImg = useRef<HTMLInputElement>(null);

  const { data: profileRes, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.getProfile
  });

  const useMutationUpdateProfile = useMutation({
    mutationFn: (body: FormData) => profileApi.updateProfile(body),
    onSuccess: (data) => {
      refetch();
      toast.success(data.data.message);
    },
    onError: (error) => {
      console.error('Update profile error', error);
    }
  });

  const profileData = profileRes?.data.data;
  const previewImage = file ? URL.createObjectURL(file) : '';

  useEffect(() => {
    if (profileData) {
      setValue('address', profileData.address);
      setValue('phone', profileData.phone);
      setValue('name', profileData.name);
      setValue('avatar', profileData.avatar ? profileData.avatar : '');

      if (profileData.date_of_birth) {
        setValue('date_of_birth', new Date(profileData.date_of_birth));
        console.log(getValues('date_of_birth'));
      }
    }
  }, [profileData, setValue, getValues]);

  console.log(profileData);

  const onSubmit = (data: FormData) => {
    useMutationUpdateProfile.mutate({ ...data });
  };
  const uploadFile = () => {
    if (inputImg.current) {
      inputImg.current.click();
    }
  };

  const avatar = watch('avatar');

  const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <div className='w-full'>
      <div className='w-full px-10 py-6 bg-white rounded-lg shadow-sm '>
        <div className='px-2 py-4 border-b border-gray-500'>
          <div className='pb-2 text-lg text-gray-900 capitalize'>Hồ sơ của tôi</div>
          <div className='pb-4 text-sm text-gray-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        </div>
        <form className='flex items-start px-2 py-12' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full px-6 py-6 sm:w-[70%] pr-16 flex-shrink-0'>
            <div className='flex items-center gap-6 pb-12 text-gray-600'>
              <div className=' truncate capitalize sm:w-[20%] text-right'>Email:</div>
              <div>acccessToken@gmail.com</div>
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600 '>
              <div className=' truncate capitalize sm:w-[20%] text-right flex-shrink-0'>Tên</div>

              <div className='relative w-full'>
                <Input
                  classNameInput='px-4 py-2 border border-gray-300 outline-none w-full'
                  className='w-full '
                  register={register}
                  placeholder='Nhập tên của bạn'
                  autoComplete='off'
                  name='name'
                  type='text'
                />
                {errors.name?.message && (
                  <div className=' text-xs text-red-500 min-h-[1rem] absolute -bottom-[20px]'>
                    {errors.name.message}
                  </div>
                )}
              </div>
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600'>
              <div className=' truncate capitalize sm:w-[20%] text-right flex-shrink-0'>Số điện thoại</div>

              <div className='relative w-full'>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }: { field: ControllerRenderProps<FormData, 'phone'> }) => (
                    <InputNumber
                      classNameInput='px-4 py-2 border border-gray-300 outline-none w-full'
                      className='w-full '
                      placeholder='Nhập số điện thoại'
                      type='text'
                      {...field} // bao gồm cả value
                      onChange={field.onChange} // truyền onChange thì phải truyền cả value
                      // dùng setValue để đưa data vào các component input của form,ko truyền trực tiếp value vào tránh làm
                      // react hook form  mất control
                    />
                  )}
                />
                {errors.phone?.message && (
                  <div className=' text-xs text-red-500 min-h-[1rem] absolute -bottom-[20px]'>
                    {errors.phone.message}
                  </div>
                )}
              </div>
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600'>
              <div className=' truncate capitalize sm:w-[20%] text-right flex-shrink-0'>Địa chỉ</div>
              <div className='relative w-full '>
                <Input
                  classNameInput='px-4 py-2 border border-gray-300 outline-none w-full'
                  className='w-full '
                  register={register}
                  autoComplete='off'
                  placeholder='Nhập địa chỉ của bạn'
                  name='address'
                  type='text'
                />
                {errors.address?.message && (
                  <div className=' text-xs text-red-500 min-h-[1rem] absolute -bottom-[20px]'>
                    {errors.address.message}
                  </div>
                )}
              </div>
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600'>
              <div className=' truncate capitalize sm:w-[20%] text-right flex-shrink-0'>Ngày sinh</div>
              <div className='sm:w-[80%] flex items-center '>
                <Controller
                  control={control}
                  name='date_of_birth'
                  render={({ field }) => (
                    <SelectDay
                      value={field.value}
                      onChange={field.onChange}
                      errorMessage={errors.date_of_birth?.message}
                    />
                  )}
                />

                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600' />
              </div>
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600'>
              <div className='w-[20%]'></div>
              <Button content='Lưu' className='px-5 py-3 text-white bg-[#ee4d2d] rounded-sm' type='submit' />
            </div>
          </div>
          <div className='w-full h-auto px-4 py-4 border-l border-gray-200'>
            <div className='flex flex-col items-center justify-center px-12 py-8'>
              <img src={previewImage || avatar} alt='avatar' className='w-24 h-24' />
              <Button
                content='Chọn ảnh'
                className='px-5 py-3 mt-6 border border-gray-300'
                type='button'
                onClick={uploadFile}
              />
              <input
                className='hidden'
                type='file'
                accept='.jpg,.jpeg,.png'
                onChange={handlePickImage}
                ref={inputImg}
              />
              <div className='mt-6 text-center'>
                <div className='text-xs text-gray-400 '>Dụng lượng file tối đa 1 MB</div>
                <div className='mt-2 text-xs text-gray-400'>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
