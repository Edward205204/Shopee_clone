import { forwardRef, useState } from 'react';
import { RegisterOptions } from 'react-hook-form';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rules?: RegisterOptions;
  autoComplete?: string;
  classNameInput?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputNumber = forwardRef<HTMLInputElement, InputProps>(function InputNumberInter(
  { type, placeholder, className, classNameInput, value = '', onChange, ...rest }: InputProps,
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^[0-9]*$/.test(value) || value === '') {
      if (onChange) onChange(e);
      setLocalValue(value);
    }
  };
  return (
    <div className={className}>
      <input
        onChange={handleChange}
        className={classNameInput}
        type={type}
        placeholder={placeholder}
        autoComplete='autoComplete'
        value={value || localValue}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

export default InputNumber;
