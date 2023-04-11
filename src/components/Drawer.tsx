import React, { useState } from 'react';
import styles from '@/styles/drawer.module.scss';

interface Props {
    children: React.ReactNode;
}

const Drawer = ({ children }: Props) => {
    const [mode, setMode] = useState('hide');

    const toggleMode = () => {
        if (mode === 'hide') {
            setMode('show');
        } else {
            setMode('hide');
        }
    }

    return (
        <div className={`${styles.wrapper} ${styles[mode]}`}>
            <svg onClick={toggleMode} className={styles.toggle} width="512" height="512" x="0" y="0" viewBox="0 0 512 512">
                <path d="M451.81 60.19C413.6 20.85 351.42 1.72 256.15 0h-.3C160.58 1.72 98.4 20.85 60.19 60.19 20.85 98.4 1.72 160.58 0 255.85v.3c1.72 95.28 20.85 157.46 60.19 195.66 38.2 39.35 100.38 58.47 195.66 60.19h.3c95.27-1.72 157.45-20.84 195.66-60.19 39.34-38.2 58.47-100.38 60.19-195.66v-.3c-1.72-95.27-20.85-157.45-60.19-195.66zm-86.68 204.04h-198.2l58.66 58.66a8.226 8.226 0 0 1-5.82 14.04c-2.11 0-4.21-.8-5.82-2.41l-71.73-71.73a8.219 8.219 0 0 1-3.58-6.79v-.2c0-2.18.86-4.27 2.41-5.82l72.5-72.5c3.21-3.21 8.42-3.21 11.63 0s3.21 8.42 0 11.64l-58.66 58.66h198.61c4.55 0 8.23 3.68 8.23 8.22 0 4.55-3.68 8.23-8.23 8.23z" fill="orange"></path>
            </svg>
            <div className={styles.p16}>
                <h3>剩余图片</h3>
                <p>点击「完成」按钮时，此处图片将会按照相同处理方式批量导出</p>
                {children}
            </div>
        </div>
    );
};

export default Drawer;
