import { Link, Text } from '@nextui-org/react';
import Logo from './AcmeLogo';
import styles from '../styles/bottomFooter.module.scss';

export default function BottomFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.column}>
                <Logo />
            </div>
            <div className={styles.column}>
                <Link href="#" color="text">Roadmap</Link>
                <Link href="#" color="text">Bordius Beta</Link>
                <Link href="#" color="text">Help</Link>
                <Link href="#" color="text">Privacy Policy</Link>
            </div>
            <div className={styles.column}>
                <Link href="#" color="text">Follow me on Twitter</Link>
                <Link href="#" color="text">Get in touch</Link>
            </div>
        </footer>
    )
}