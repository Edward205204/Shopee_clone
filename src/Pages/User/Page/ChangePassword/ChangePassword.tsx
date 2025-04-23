import { useForm } from 'react-hook-form';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { changePasswordSchema, TypeChangePasswordSchema } from '../../../../utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { profileApi } from '../../../../APIs/profile.api';
import { toast } from 'react-toastify';
import ResponseAPI from '../../../../types/ultils';
import { isUnprocessableEntityError } from '../../../../utils/utils';

type FormData = TypeChangePasswordSchema;
type FullFormData = FormData & {
  name: string;
  address: string;
  phone: string;
  date_of_birth: string;
  avatar: string;
};

export default function ChangePassword() {
  const {
    handleSubmit,
    setError,
    formState: { errors },
    register
  } = useForm<FormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    }
  });

  const useMutationUpdateProfile = useMutation({
    mutationFn: (body: FullFormData) => profileApi.updateProfile(body),
    onError: (error) => {
      if (isUnprocessableEntityError<ResponseAPI<FullFormData>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) =>
            setError(key as keyof FormData, {
              type: 'server',
              message: formError[key as keyof FormData]
            })
          );
        }
      } else {
        toast.error(error.message);
      }
    }
  });

  const onSubmit = async (data: FormData) => {
    await useMutationUpdateProfile.mutateAsync(data as FullFormData);
    toast.success('Cập nhật mật khẩu thành công');
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
            <div className='flex items-center gap-6 pb-12 text-gray-600 '>
              <div className=' truncate capitalize sm:w-[25%] text-right flex-shrink-0'>Password</div>
              <div className='relative w-full'>
                <Input
                  classNameInput='px-4 py-2 border border-gray-300 outline-none w-full'
                  className='w-full '
                  register={register}
                  placeholder='Password'
                  autoComplete='off'
                  name='password'
                  type='password'
                />
                {errors.password?.message && (
                  <div className=' text-xs text-red-500 min-h-[1rem] absolute -bottom-[20px]'>
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600 '>
              <div className=' truncate capitalize sm:w-[25%] text-right flex-shrink-0'>New Password</div>
              <div className='relative w-full'>
                <Input
                  classNameInput='px-4 py-2 border border-gray-300 outline-none w-full'
                  className='w-full '
                  register={register}
                  placeholder='New Password'
                  autoComplete='off'
                  name='new_password'
                  type='password'
                />
                {errors.new_password?.message && (
                  <div className=' text-xs text-red-500 min-h-[1rem] absolute -bottom-[20px]'>
                    {errors.new_password.message}
                  </div>
                )}
              </div>
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600 '>
              <div className=' truncate capitalize sm:w-[25%] text-right flex-shrink-0'>Confirm Password</div>
              <div className='relative w-full'>
                <Input
                  classNameInput='px-4 py-2 border border-gray-300 outline-none w-full'
                  className='w-full '
                  register={register}
                  placeholder='Confirm Password'
                  autoComplete='off'
                  name='confirm_password'
                  type='password'
                />
                {errors.confirm_password?.message && (
                  <div className=' text-xs text-red-500 min-h-[1rem] absolute -bottom-[20px]'>
                    {errors.confirm_password.message}
                  </div>
                )}
              </div>
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600'>
              <div className='w-[20%]'></div>
              <Button content='Lưu' className='px-5 py-3 text-white bg-[#ee4d2d] rounded-sm' type='submit' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
