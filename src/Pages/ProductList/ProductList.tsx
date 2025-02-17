import AsideFilter from './Aside';
import SortProductList from './SortList';

export default function ProductList() {
  return (
    <div className='py-2  border-b-[#ee4d2d] border-b-[2px] bg-[#f5f5f5]'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-4'>
          <AsideFilter />
          <div className='col-span-10'>
            <SortProductList />
            <div className='grid grid-cols-2 gap-2 border border-gray-300 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className='col-span-1 w-full h-[300px] shadow-sm bg-white '>
                    item {index}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
