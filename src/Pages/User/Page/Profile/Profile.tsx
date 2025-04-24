import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { TypUserProfileSchema, userProfileSchema } from '../../../../utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputNumber from '../../../../components/InputNumber';
import SelectDay from '../../components/SelectDay';
import { useMutation, useQuery } from '@tanstack/react-query';
import { profileApi } from '../../../../APIs/profile.api';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAvatarUrl, isUnprocessableEntityError } from '../../../../utils/utils';
import { setProfileToLS } from '../../../../utils/auth';
import { AppContext } from '../../../../contexts/app.context';
import ResponseAPI from '../../../../types/ultils';
import InputFile from '../../../../components/InputFile';
import { Helmet } from 'react-helmet-async';

type FormData = Pick<TypUserProfileSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>;
type FormDataUpdate = Pick<TypUserProfileSchema, 'name' | 'address' | 'phone' | 'avatar'> & {
  date_of_birth: string;
};

// 1MB ===  1048576 bytes

// Cần có avatar và previewImage để hiển thị ảnh đại diện vì khi chưa có ảnh đại diện thì không thể lấy được đường dẫn
// của ảnh đại diện từ api nên cần phải có avatar để hiển thị ảnh đại diện đồng thời phải thực hiện thao tác sử lý để
//  api ảnh có thẻ show lên giao diện. Còn previewImage nhận value từ file upload lên nhưng sau đó còn phải có thao tác URL.createObjectURL để show lên giao diện. => DÙ cuối cùng kết quả như nhau nhưng cả hai đều có thao tác thực hiện khác nhau nên cần phải có cả hai biến này
// 1. avatar: là đường dẫn của ảnh đại diện từ api trả về(dù avatar dùng watch tracking được ảnh tải lên nhưng lại không có quá trình tạo URL.createObjectURL để hiển thị ảnh đại diện lên giao diện)
// 2. previewImage: là đường dẫn của ảnh đại diện từ file upload lên

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
    setError,
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

  const { setProfile } = useContext(AppContext);

  const { data: profileRes, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.getProfile
  });

  const useMutationUpdateProfile = useMutation({
    mutationFn: (body: FormData | FormDataUpdate) => profileApi.updateProfile(body),
    onError: (error) => {
      console.error('Update profile error', error);
    }
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: (formData: globalThis.FormData) => profileApi.uploadAvatar(formData)
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
      }
    }
  }, [profileData, setValue, getValues]);

  const handleChange = (file: File) => {
    setFile(file);
  };

  const onSubmit = async (data: FormData) => {
    try {
      let avatarName = avatar;
      if (file) {
        const form = new FormData();
        form.append('image', file);
        const uploadRes = await uploadAvatarMutation.mutateAsync(form);
        avatarName = uploadRes.data.data;
        setValue('avatar', avatarName);
      }
      const res = await useMutationUpdateProfile.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      });
      setProfile(res.data.data);
      setProfileToLS(res.data.data);
      refetch();
      toast.success(res.data.message);
    } catch (error) {
      if (isUnprocessableEntityError<ResponseAPI<FormDataUpdate>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) =>
            setError(key as keyof FormDataUpdate, {
              type: 'server',
              message: formError[key as keyof FormDataUpdate]
            })
          );
        }
      }
    }
  };

  const avatar = watch('avatar');
  return (
    <div className='w-full'>
      <Helmet>
        <title>Profile | Shopee Clone</title>
        <meta name='description' content='Trang thông tin người dùng' />
      </Helmet>
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
              <div className='w-24 h-24 overflow-hidden rounded-full'>
                <img src={previewImage || getAvatarUrl(avatar)} alt='avatar' className='w-full h-full' />
              </div>
              <InputFile onChange={handleChange} />
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
