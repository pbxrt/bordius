import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Faq() {
    const router = useRouter();
    const onClickFAQ = () => {
        router.push('/faq');
    }
    return (
        <>
            <Head>
                <title>照片加圆角</title>
                <meta name="description" content="照片加圆角" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/tea.png" />
            </Head>
            <main className={styles.main}>
                this is FAQ
            </main>
        </>
    )
}
