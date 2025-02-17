import AsideFilter from './Aside';
import SortProductList from './SortList';

export default function ProductList() {
  return (
    <div className='grid grid-cols-12 gap-4 border-b-[2px] border-[#ee4d2d]'>
      <AsideFilter />
      <div className='col-span-10'>
        <SortProductList />
        <div>List</div>
      </div>
    </div>
  );
}
