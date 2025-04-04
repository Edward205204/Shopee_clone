import InputNumber from '../InputNumber';
import { InputProps } from '../InputNumber/InputNumber';

interface QuantityProps extends InputProps {
  max?: number;
  onType?: (value: number) => void;
  handleIncrease?: (value: number) => void;
  handleDecrease?: (value: number) => void;
  quantity?: number | string;
}

export default function QuantityController({
  onType,
  handleIncrease,
  handleDecrease,
  max,
  quantity,
  ...rest
}: QuantityProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value);
    if (max !== undefined && _value > max) {
      _value = max - 1;
    } else if (_value < 1) {
      _value = 1;
    }

    if (onType) {
      onType(_value);
    }
  };

  const increase = () => {
    console.log(max);
    quantity = Number(quantity);
    if (max !== undefined && quantity && quantity < max && handleIncrease) {
      handleIncrease(quantity + 1);
    }
  };

  const decrease = () => {
    quantity = Number(quantity);
    if (max !== undefined && quantity && quantity > 1 && handleDecrease) {
      handleDecrease(quantity - 1);
    }
  };
  console.log(quantity);

  return (
    <div className='flex items-center '>
      <button
        className='w-10 h-10 border rounded-l-sm border-r-0 border-[#d0011b] flex items-center justify-center'
        onClick={decrease}
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
        onChange={handleChange}
        value={quantity?.toString()}
        className='w-16 h-10 border border-[#d0011b]'
        classNameInput='text-[#d0011b] w-full h-full border-none outline-none text-center'
        {...rest}
      />
      <button
        className='w-10 h-10 border  border-l-0 border-[#d0011b] rounded-r-sm flex items-center justify-center'
        onClick={increase}
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
