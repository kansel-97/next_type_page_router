import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CartProvider } from '@/context/cartContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <CartProvider>
       <Header/>
             <Component {...pageProps} />
       <Footer/>
    </CartProvider>
    </>
  )
}
