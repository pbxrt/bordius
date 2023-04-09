import { Text, Badge } from '@nextui-org/react';
import { useRouter } from 'next/router';
import styles from './logo.module.scss';

export default function Logo() {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Badge color="primary" size="md" enableShadow variant="bordered" style={{margin: 'auto'}}>B.R.</Badge>
            <Text style={{marginLeft: 12}} b color="inherit">
                Bordius
            </Text>
        </div>
    )
}

export function GoBack() {
    const router = useRouter();
    return (
        <div className={styles.goBack} onClick={() => router.back()}>
            <Badge color="primary" size="md" enableShadow variant="bordered" className={styles.badge}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="7 9 4 6 7 3"></polyline>
                </svg>
            </Badge>
            <Text style={{marginLeft: 12}} b color="inherit">
                Back to Home
            </Text>
        </div>
    )
}