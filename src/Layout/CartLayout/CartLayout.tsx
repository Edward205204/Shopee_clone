import CartHeader from '../../components/CartHeader';
import Footer from '../../components/Footer';

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartHeader />

      <div className='bg-white'>{/* <Header /> */}</div>
      {children}
      {<Footer />}
    </>
  );
}
