import Head from 'next/head'
import 'flowbite';
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { TrangChu } from './trangchu'
import { Layout } from './components/layout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Layout title="HTTC Store" maxwidth='max-w-screen-xl'>
        <TrangChu />
      </Layout>
    </>
  )
}
