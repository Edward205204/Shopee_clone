export default function SortProductList() {
  return (
    <div className='flex items-center justify-between px-4 py-3 my-5 mt-10 bg-gray-200 rounded-sm'>
      <div className='flex items-center '>
        <div className='mr-4 text-sm'>Sắp xếp theo</div>
        <button className='px-6 py-3 ml-4 bg-[#ee4d2d] text-white rounded-sm'>Phổ biến</button>
        <button className='px-6 py-3 ml-4 bg-white rounded-sm'>Mới nhất</button>
        <button className='px-6 py-3 ml-4 bg-white rounded-sm'>Bán chạy</button>
        <select className='px-3 py-3 pr-2 ml-4 text-left bg-white rounded-sm outline-none'>
          <option value='' className='hidden'>
            Giá
          </option>
          <option value='price:asc'>Giá: Thấp đến cao</option>
          <option value='price:asc'>Giá: Cao đến thấp</option>
        </select>
      </div>
      <div className='flex items-center'>
        <span className='text-base text-[#ee4d2d]'>1</span>
        <span className='text-base'>/9</span>
        <button className='p-2 ml-2 rounded-sm bg-white/60 hover:bg-slate-100'>
          <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5'>
            <path d='M17 5l-7 7 7 7' stroke='currentColor' strokeWidth={1} />
          </svg>
        </button>
        <button className='p-2 ml-1 bg-white rounded-sm hover:bg-slate-100'>
          <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5'>
            <path d='M7 5l7 7-7 7' stroke='currentColor' strokeWidth={1} />
          </svg>
        </button>
      </div>
    </div>
  );
}
