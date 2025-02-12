import { RegisterOptions, UseFormRegister } from 'react-hook-form';
interface InputProps {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: React.InputHTMLAttributes<HTMLInputElement>['placeholder'];
  errorMessage?: string;
  className?: string;
  rules?: RegisterOptions;
  autoComplete?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

export default function Input({
  type,
  placeholder,
  errorMessage,
  autoComplete,
  className,
  name,
  rules,
  register
}: InputProps) {
  return (
    <div className={className}>
      <input
        className='w-full h-10 p-2 text-sm border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm'
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='mt-1 text-xs text-red-500 min-h-[1rem]'>{errorMessage}</div>
    </div>
  );
}
