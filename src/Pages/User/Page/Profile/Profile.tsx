import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

export default function Profile() {
  return (
    <div className='w-full'>
      <div className='w-full px-10 py-6 bg-white rounded-lg shadow-sm '>
        <div className='px-2 py-4 border-b border-gray-500'>
          <div className='text-lg text-gray-900 capitalize'>Hồ sơ của tôi</div>
          <div className='text-sm text-gray-900'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        </div>
        <div className='flex items-start px-2 py-12'>
          <div className='w-full px-6 py-6 sm:w-[70%] pr-16 flex-shrink-0'>
            <div className='flex items-center gap-6 pb-12 text-gray-600'>
              <div className=' truncate capitalize sm:w-[20%] text-right'>Email:</div>
              <div>acccessToken@gmail.com</div>
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600'>
              <div className=' truncate capitalize sm:w-[20%] text-right flex-shrink-0'>Tên</div>
              <Input classNameInput='px-4 py-2 border border-gray-300 outline-none w-full' className='w-full ' />
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600'>
              <div className=' truncate capitalize sm:w-[20%] text-right flex-shrink-0'>Số điện thoại</div>
              <Input classNameInput='px-4 py-2 border border-gray-300 outline-none w-full' className='w-full ' />
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600'>
              <div className=' truncate capitalize sm:w-[20%] text-right flex-shrink-0'>Địa chỉ</div>
              <Input classNameInput='px-4 py-2 border border-gray-300 outline-none w-full' className='w-full ' />
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600'>
              <div className=' truncate capitalize sm:w-[20%] text-right flex-shrink-0'>Ngày sinh</div>
              <div className='sm:w-[80%] flex items-center '>
                <div className='flex justify-between gap-6'>
                  <select
                    name='date'
                    className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
                  >
                    <option disabled>Ngày</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                    <option value={14}>14</option>
                    <option value={15}>15</option>
                    <option value={16}>16</option>
                    <option value={17}>17</option>
                    <option value={18}>18</option>
                    <option value={19}>19</option>
                    <option value={20}>20</option>
                    <option value={21}>21</option>
                    <option value={22}>22</option>
                    <option value={23}>23</option>
                    <option value={24}>24</option>
                    <option value={25}>25</option>
                    <option value={26}>26</option>
                    <option value={27}>27</option>
                    <option value={28}>28</option>
                    <option value={29}>29</option>
                    <option value={30}>30</option>
                    <option value={31}>31</option>
                  </select>
                  <select
                    name='month'
                    className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
                  >
                    <option disabled>Tháng</option>
                    <option value={0}>1</option>
                    <option value={1}>2</option>
                    <option value={2}>3</option>
                    <option value={3}>4</option>
                    <option value={4}>5</option>
                    <option value={5}>6</option>
                    <option value={6}>7</option>
                    <option value={7}>8</option>
                    <option value={8}>9</option>
                    <option value={9}>10</option>
                    <option value={10}>11</option>
                    <option value={11}>12</option>
                  </select>
                  <select
                    name='year'
                    className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
                  >
                    <option disabled>Năm</option>
                    <option value={1990}>1990</option>
                    <option value={1991}>1991</option>
                    <option value={1992}>1992</option>
                    <option value={1993}>1993</option>
                    <option value={1994}>1994</option>
                    <option value={1995}>1995</option>
                    <option value={1996}>1996</option>
                    <option value={1997}>1997</option>
                    <option value={1998}>1998</option>
                    <option value={1999}>1999</option>
                    <option value={2000}>2000</option>
                    <option value={2001}>2001</option>
                    <option value={2002}>2002</option>
                    <option value={2003}>2003</option>
                    <option value={2004}>2004</option>
                    <option value={2005}>2005</option>
                    <option value={2006}>2006</option>
                    <option value={2007}>2007</option>
                    <option value={2008}>2008</option>
                    <option value={2009}>2009</option>
                    <option value={2010}>2010</option>
                    <option value={2011}>2011</option>
                    <option value={2012}>2012</option>
                    <option value={2013}>2013</option>
                    <option value={2014}>2014</option>
                    <option value={2015}>2015</option>
                    <option value={2016}>2016</option>
                    <option value={2017}>2017</option>
                    <option value={2018}>2018</option>
                    <option value={2019}>2019</option>
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
                  </select>
                </div>
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600' />
              </div>
            </div>

            <div className='flex items-center gap-6 pb-12 text-gray-600'>
              <div className='w-[20%]'></div>
              <Button content='Lưu' className='px-5 py-3 text-white bg-[#ee4d2d] rounded-sm' />
            </div>
          </div>
          <div className='w-full h-auto px-4 py-4 border-l border-gray-200'>
            <div className='flex flex-col items-center justify-center px-12 py-8'>
              <img src='../../../../../public/vite.svg' alt='avatar' className='w-24 h-24' />
              <Button content='Chọn ảnh' className='px-5 py-3 mt-6 border border-gray-300' />
              <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
              <div className='mt-6 text-center'>
                <div className='text-xs text-gray-400 '>Dụng lượng file tối đa 1 MB</div>
                <div className='mt-2 text-xs text-gray-400'>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
