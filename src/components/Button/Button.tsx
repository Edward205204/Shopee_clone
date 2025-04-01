import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  handleReset?: () => void;
}

export default function Button({ isLoading, className, content, disabled, handleReset }: ButtonProps) {
  const newClassName = `${className} ${isLoading ? 'hover:opacity-50 hover:cursor-not-allowed' : ''}`;
  return (
    <div className='mt-2'>
      <button
        className={newClassName}
        disabled={disabled}
        onClick={() => {
          if (handleReset) handleReset();
        }}
      >
        {content}
      </button>
    </div>
  );
}
