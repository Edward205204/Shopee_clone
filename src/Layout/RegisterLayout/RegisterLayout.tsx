import { ReactNode } from 'react';
import RegisterHeader from '../../components/RegisterHeader';
import Footer from '../../components/Footer';

interface props {
  children?: ReactNode;
}

export default function RegisterLayout({ children }: props) {
  return (
    <>
      <RegisterHeader />
      {children}
      <Footer />
    </>
  );
}
