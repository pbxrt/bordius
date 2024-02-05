import { useRef, useState } from 'react';
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import { useRouter } from 'next/router';
import EditCover from '@/components/editCover';
import BottomFooter from '@/components/BottomFooter';
import { Button, Navbar, Text, Link } from '@nextui-org/react';
import NavBar from '@/components/NavBar';

export default function Home() {
    const [showCover, setShowCover] = useState(false);
    const router = useRouter();
    const onClickFAQ = () => {
        router.push('/faq');
    }
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        window.filesRef = event.target.files;
        router.push('/edit');
    }
    const triggerInputFile = () => {
        if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
            alert('暂不支持手机浏览器，请用桌面浏览器打开此页面~')
            return;
        }
        inputRef.current?.click();
    }
    return (
        <>
            <main className={styles.main}>
                <Image
                    className={styles.banner}
                    src="/space.webp"
                    width="1000"
                    height="750"
                    alt="logo"
                />
                <NavBar />
                <div className={styles.word}>
                    <Text h1
                        size="12vw"
                        css={{
                            textGradient: '45deg, $blue600, $pink600 60%',
                        }}
                        weight="bold"
                    >
                        照片加圆角
                    </Text>
                    <Text h4 weight="light" size="18px">
                        支持自定义比例、裁剪等功能，就是这么简单的东西，竟然还被我做成了网站 🤣
                    </Text>
                </div>
                <Button style={{margin: '30px auto 0'}} size="lg" rounded color="gradient" onClick={triggerInputFile}>载入照片</Button>
                <img className={styles.video} src="./walk_through.gif"></img>
                {/* <video className={styles.video} loop muted playsInline>
                    <source src="./hero-v2.mp4" type="video/mp4"></source>
                </video> */}
                <BottomFooter />
            </main>
            <input accept=".png,.jpg,.jpeg" multiple className={styles.fileInput} ref={inputRef} type="file" onChange={handleChange} />
        </>
    )
}

export async function getStaticProps() {
    return { props: { } };
}