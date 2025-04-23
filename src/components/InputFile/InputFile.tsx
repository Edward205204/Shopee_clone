import { useRef } from 'react';
import { isInputElement } from '../../utils/utils';
import { toast } from 'react-toastify';
import Button from '../Button';

interface Props {
  onChange?: (file: File) => void;
}

const MAX_FILE_SIZE = 1048576;

export default function InputFile({ onChange }: Props) {
  const inputImg = useRef<HTMLInputElement>(null);
  const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) return toast.error('Kích thước file không được lớn hơn 1MB');
    if (!file.type.startsWith('image/')) return toast.error('File không đúng định dạng');
    if (onChange) {
      onChange(file);
    }
  };

  const resetFileRef = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (isInputElement(e.target)) {
      e.target.value = '';
    }
  };

  const uploadFile = () => {
    if (inputImg.current) {
      inputImg.current.click();
    }
  };

  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        onChange={handlePickImage}
        ref={inputImg}
        onClick={resetFileRef}
      />
      <Button
        content='Chọn ảnh'
        className='px-5 py-3 mt-6 border border-gray-300'
        type='button'
        handleClick={uploadFile}
      />
    </>
  );
}
