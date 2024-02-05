import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Faq() {
    const router = useRouter();
    return (
      <main className={styles.main}>
        <NavBar />
        <div style={{display: 'flex', marginTop: '50px', justifyContent: 'center', alignItems: 'center'}}> 
          <Image src='/group_qrcode.jpg' alt="group qrcode" width="285" height="507" />
        </div>
      </main>
    )
}
