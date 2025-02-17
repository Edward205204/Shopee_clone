import { RegisterOptions, UseFormRegister } from 'react-hook-form';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // type?: React.HTMLInputTypeAttribute;
  // placeholder?: React.InputHTMLAttributes<HTMLInputElement>['placeholder'];
  // className?: string;
  // name: string;
  // Ko càn những thuộc tính ở trên vì đã kế thừa từ input mặc định
  errorMessage?: string;
  rules?: RegisterOptions;
  autoComplete?: string;
  classNameInput?: string;
  classNameError?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
}

export default function Input({
  type,
  placeholder,
  errorMessage,
  autoComplete,
  className,
  name,
  rules,
  classNameInput,
  classNameError,
  register
}: InputProps) {
  const registerOptions = name && register ? register(name, rules) : {};
  return (
    <div className={className}>
      <input
        className={classNameInput}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registerOptions}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
}
