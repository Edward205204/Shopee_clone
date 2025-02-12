import { Link } from 'react-router';
import { loginSchema, typeOfLoginSchema } from '../../utils/zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../components/Input';
import { useMutation } from '@tanstack/react-query';
import { LoginRequest } from '../../APIs/userRegister.api';
import { isUnprocessableEntityError } from '../../utils/utils';
import ResponseAPI from '../../types/ultils';

export type InputForm = typeOfLoginSchema;
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<InputForm>({ resolver: zodResolver(loginSchema) });

  const useLoginMutation = useMutation({
    mutationFn: (body: InputForm) => {
      return LoginRequest(body);
    },
    onSuccess: (data) => {
      console.log(data);
      console.log('ok');
    },
    onError: (error) => {
      if (isUnprocessableEntityError<ResponseAPI<InputForm>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) =>
            setError(key as keyof InputForm, {
              type: 'server',
              message: formError[key as keyof InputForm]
            })
          );
        }
      }
    }
  });

  const onSubmit = (data: InputForm) => {
    useLoginMutation.mutate(data);
  };

  return (
    <>
      <div className='bg-[#ee4d2d]' onSubmit={handleSubmit(onSubmit)}>
        <div className='container'>
          <div className='grid grid-cols-1 p-10 py-12 lg:grid-cols-6 lg:py-32 lg:pr-[80px]'>
            <div className='hidden pl-10 text-center text-white lg:block lg:col-start-1 lg:col-span-2 lg:col-end-4'>
              <div className='flex justify-center'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='240px' height='240px'>
                  <path
                    fill='white'
                    d='M36.683,43H11.317c-2.136,0-3.896-1.679-3.996-3.813l-1.272-27.14C6.022,11.477,6.477,11,7.048,11 h33.904c0.571,0,1.026,0.477,0.999,1.047l-1.272,27.14C40.579,41.321,38.819,43,36.683,43z'
                  />
                  <path
                    fill='white'
                    d='M32.5,11.5h-2C30.5,7.364,27.584,4,24,4s-6.5,3.364-6.5,7.5h-2C15.5,6.262,19.313,2,24,2 S32.5,6.262,32.5,11.5z'
                  />
                  <path
                    fill='#ee4d2d'
                    d='M24.248,25.688c-2.741-1.002-4.405-1.743-4.405-3.577c0-1.851,1.776-3.195,4.224-3.195 c1.685,0,3.159,0.66,3.888,1.052c0.124,0.067,0.474,0.277,0.672,0.41l0.13,0.087l0.958-1.558l-0.157-0.103 c-0.772-0.521-2.854-1.733-5.49-1.733c-3.459,0-6.067,2.166-6.067,5.039c0,3.257,2.983,4.347,5.615,5.309 c3.07,1.122,4.934,1.975,4.934,4.349c0,1.828-2.067,3.314-4.609,3.314c-2.864,0-5.326-2.105-5.349-2.125l-0.128-0.118l-1.046,1.542 l0.106,0.087c0.712,0.577,3.276,2.458,6.416,2.458c3.619,0,6.454-2.266,6.454-5.158C30.393,27.933,27.128,26.741,24.248,25.688z'
                  />
                </svg>
              </div>
              <p className='mt-1 text-5xl'>Shopee</p>
              <p className='mt-12 text-2xl tracking-widest'>
                Nền tảng thương mại điện tử yêu thích ở Đông Nam Á & Đài Loan
              </p>
            </div>
            <div className='lg:col-start-5 lg:col-span-2'>
              <form className='p-10 bg-white rounded-sm shadow-sm min-w-[380px] '>
                <div className='text-2xl text-center text-black lg:text-left'>Đăng Nhập</div>
                <Input
                  className='mt-8'
                  name='email'
                  type='text'
                  placeholder='Email'
                  register={register}
                  errorMessage={errors.email?.message}
                />
                <Input
                  className='mt-3'
                  name='password'
                  type='password'
                  placeholder='Password'
                  register={register}
                  errorMessage={errors.password?.message}
                  autoComplete='on'
                />
                <div className='mt-8'>
                  <button className='w-full bg-[#ee4d2d] h-12 rounded-sm uppercase text-white hover:opacity-90'>
                    Đăng Nhập
                  </button>
                </div>
                <div className='flex items-center justify-center mt-3 text-sm'>
                  <div className='text-gray-400 '>Bạn mới biết đến Shopee?</div>
                  <Link to={'/register'} className='ml-1 hover:underline text-[#ee4d2d]'>
                    Đăng ký
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
