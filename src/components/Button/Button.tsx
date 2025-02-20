import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  isLoading: boolean;
  className?: string;
  disabled?: boolean;
}

export default function Button({ isLoading, className, content, disabled }: ButtonProps) {
  const newClassName = `${className} ${isLoading ? 'hover:opacity-50 hover:cursor-not-allowed' : ''}`;
  return (
    <div className='mt-8'>
      <button className={newClassName} disabled={disabled}>
        {content}
      </button>
    </div>
  );
}
