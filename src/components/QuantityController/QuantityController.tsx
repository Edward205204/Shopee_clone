import { useEffect, useState } from 'react';
import InputNumber from '../InputNumber';
import { InputProps } from '../InputNumber/InputNumber';

interface QuantityProps extends InputProps {
  max?: number;
  onType?: (value: string) => void;
  handleIncrease?: (value: string) => void;
  handleDecrease?: (value: string) => void;
  quantity?: string;
  onBlurMutation?: (value: string) => void;
  disableStyle?: string;
}

export default function QuantityController({
  onType,
  handleIncrease,
  handleDecrease,
  max,
  quantity,
  onBlurMutation,
  disableStyle,
  ...rest
}: QuantityProps) {
  const [localValue, setLocalValue] = useState<string>(quantity || '');

  useEffect(() => {
    if (quantity === undefined) return;
    setLocalValue(quantity);
  }, [quantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value);
    if (e.target.value === '') {
      setLocalValue('');
      if (onType) onType('');
      return;
    }
    if (max !== undefined && _value > max) {
      _value = max - 1;
    } else if (_value < 1) {
      _value = 1;
    }

    if (onType) onType(_value.toString());

    setLocalValue(_value.toString());
  };

  const increase = () => {
    const _quantity = Number(quantity) || Number(localValue);

    if (max !== undefined && _quantity && _quantity < max) {
      if (handleIncrease) handleIncrease((_quantity + 1).toString());
      setLocalValue((_quantity + 1).toString());
    }
  };

  const decrease = () => {
    const _quantity = Number(quantity) || Number(localValue);
    if (max !== undefined && _quantity && _quantity > 1) {
      if (handleDecrease) handleDecrease((_quantity - 1).toString());
      setLocalValue((_quantity - 1).toString());
    }
  };

  return (
    <div className='flex items-center '>
      <button
        className={`w-10 h-10 border rounded-l-sm border-r-0 border-[#d0011b] flex items-center justify-center ${disableStyle ? disableStyle : ''}`}
        onClick={decrease}
        disabled={rest.disabled}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        disableStyle={disableStyle}
        onChange={handleChange}
        value={localValue}
        className='w-16 h-10 border border-[#d0011b]'
        classNameInput='text-[#d0011b] w-full h-full border-none outline-none text-center'
        onBlur={(e) => {
          if (onBlurMutation) {
            onBlurMutation(e.target.value);
          }
        }}
        {...rest}
      />
      <button
        className={`w-10 h-10 border  border-l-0 border-[#d0011b] rounded-r-sm flex items-center justify-center ${disableStyle ? disableStyle : ''}`}
        onClick={increase}
        disabled={rest.disabled}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  );
}
