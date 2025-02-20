import { ReactNode } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

interface props {
  children?: ReactNode;
}

export default function MainLayout({ children }: props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
