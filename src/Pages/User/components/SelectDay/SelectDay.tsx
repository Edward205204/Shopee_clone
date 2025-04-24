import range from 'lodash/range';
import { useEffect, useState } from 'react';

interface SelectDayProps {
  value?: Date;
  onChange?: (value: Date) => void;
  errorMessage?: string;
}

export default function SelectDay({ value, onChange, errorMessage }: SelectDayProps) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || new Date().getFullYear()
  });

  // console.log(value);

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      });
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: inputValue } = e.target;
    const newDate = {
      ...date,
      [name]: parseInt(inputValue)
    };
    setDate(newDate);
    if (onChange) {
      onChange(new Date(newDate.year, newDate.month, newDate.date));
    }
  };

  return (
    <div>
      <div className='flex justify-between gap-6'>
        <select
          name='date'
          className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
          onChange={handleChange}
          value={value?.getDate() || date.date}
        >
          <option disabled>Ngày</option>
          {range(1, 32).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          name='month'
          className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
          onChange={handleChange}
          value={value?.getMonth() || date.month}
        >
          <option disabled>Tháng</option>
          {range(0, 12).map((item) => (
            <option key={item} value={item}>
              {item + 1}
            </option>
          ))}
        </select>
        <select
          onChange={handleChange}
          name='year'
          value={value?.getFullYear() || date.year}
          className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
        >
          <option disabled>Năm</option>
          {range(1990, new Date().getFullYear() + 1).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {errorMessage && <div className='mt-4 text-xs text-red-500 min-h-[1rem]'>{errorMessage}</div>}
    </div>
  );
}
