import { useState, useEffect, useRef } from 'react';
import { Button, Text, Badge, Container, Row, Col, Input, Spacer } from '@nextui-org/react';
import styles from '@/styles/edit.module.scss'
import { useRouter } from 'next/router';
import { NavBarInEditPage } from '@/components/NavBar';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { getImageSize } from '@/utils/index';
import Slider from '@/components/Slider';
import { generateImg } from '@/utils/index';

export default function Edit() {
    const router = useRouter();
    const naturalSizeRef = useRef<any>()
    const [ activeBtn, setActiveBtn ] = useState('crop');
    const canvasContainerRef = useRef<any>();
    const canvasWrapperRef = useRef<any>();

    const topLineRef = useRef<any>();
    const rightLineRef = useRef<any>();
    const bottomLineRef = useRef<any>();
    const leftLineRef = useRef<any>();

    const topLeftCircleRef = useRef<any>();
    const topRightCircleRef = useRef<any>();
    const bottomLeftCircleRef = useRef<any>();
    const bottomRightCircleRef = useRef<any>();

    const centerMoveRef = useRef<any>();

    const imgRef = useRef<any>();

    const [layout, setLayout] = useState({
        direction: 'landscape',
        calcWidth: 300,
        calcHeight: 300,
    });
    const maxRadius = layout.direction === 'landscape'
        ? layout.calcHeight / 2
        : layout.calcWidth / 2;

    const lineActiveRef = useRef<{
        top: boolean;
        right: boolean;
        bottom: boolean;
        left: boolean;
        topLeft: boolean;
        topRight: boolean;
        bottomRight: boolean;
        bottomLeft: boolean;
        center: boolean;
    }>({
        top: false,
        right: false,
        bottom: false,
        left: false,
        topLeft: false,
        topRight: false,
        bottomRight: false,
        center: false,
        bottomLeft: false,
    });
    const centerRef = useRef<{
        pageX: number;
        pageY: number;
    }>({
        pageX: NaN,
        pageY: NaN,
    });

    const [crop, setCrop] = useState({
        x: 25,
        y: 25,
        width: 50,
        height: 50,
        borderRadius: 0,
    })

    const [imgObjectURL, setImgObjectURL] = useState('');

    useEffect(() => {
        const files = window.filesRef;
        if (!files) {
            router.push('/');
            return;
        } else {
            setImgObjectURL(window.URL.createObjectURL(files[0]));
            getImageSize(files[0]).then(([naturalWidth, naturalHeight]) => {
                const naturalRatio = naturalWidth / naturalHeight;
                const { offsetWidth, offsetHeight } = canvasWrapperRef.current;
                const containerRatio = offsetWidth / offsetHeight;

                if (naturalRatio > containerRatio) {
                    // 原始图片更宽，横向撑满
                    setLayout({
                        direction: 'landscape',
                        calcWidth: offsetWidth,
                        calcHeight: naturalWidth / offsetWidth * naturalHeight,
                    });
                    
                } else {
                    // 原始图片更高，纵向撑满
                    setLayout({
                        direction: 'portrait',
                        calcWidth: offsetHeight / naturalHeight * naturalWidth,
                        calcHeight: offsetHeight,
                    });
                }
            });
        }

        topLineRef.current.addEventListener('mousedown', (e: MouseEvent) => {
            lineActiveRef.current.top = true;
        });
        rightLineRef.current.addEventListener('mousedown', (e: MouseEvent) => {
            lineActiveRef.current.right = true;
        });
        bottomLineRef.current.addEventListener('mousedown', (e: MouseEvent) => {
            lineActiveRef.current.bottom = true;
        });
        leftLineRef.current.addEventListener('mousedown', (e: MouseEvent) => {
            lineActiveRef.current.left = true;
        });
        topLeftCircleRef.current.addEventListener('mousedown', (e: MouseEvent) => {
            lineActiveRef.current.topLeft = true;
        });
        topRightCircleRef.current.addEventListener('mousedown', (e: MouseEvent) => {
            lineActiveRef.current.topRight = true;
        });
        bottomLeftCircleRef.current.addEventListener('mousedown', (e: MouseEvent) => {
            lineActiveRef.current.bottomLeft = true;
        });
        bottomRightCircleRef.current.addEventListener('mousedown', (e: MouseEvent) => {
            lineActiveRef.current.bottomRight = true;
        });
        centerMoveRef.current.addEventListener('mousedown', (e: MouseEvent) => {
            lineActiveRef.current.center = true;
            centerRef.current = {
                pageX: e.pageX,
                pageY: e.pageY,
            };
        });

        topLineRef.current.addEventListener('mouseup', () => {
            lineActiveRef.current.top = false;
        });
        rightLineRef.current.addEventListener('mouseup', () => {
            lineActiveRef.current.right = false;
        });
        bottomLineRef.current.addEventListener('mouseup', () => {
            lineActiveRef.current.bottom = false;
        });
        leftLineRef.current.addEventListener('mouseup', () => {
            lineActiveRef.current.left = false;
        });
        topLeftCircleRef.current.addEventListener('mouseup', (e: MouseEvent) => {
            lineActiveRef.current.topLeft = false;
        });
        topRightCircleRef.current.addEventListener('mouseup', (e: MouseEvent) => {
            lineActiveRef.current.topRight = false;
        });
        bottomLeftCircleRef.current.addEventListener('mouseup', (e: MouseEvent) => {
            lineActiveRef.current.bottomLeft = false;
        });
        bottomRightCircleRef.current.addEventListener('mouseup', (e: MouseEvent) => {
            lineActiveRef.current.bottomRight = false;
        });
        centerMoveRef.current.addEventListener('mouseup', (e: MouseEvent) => {
            lineActiveRef.current.center = false;
        })
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            let deltaX = 0;
            let deltaY = 0;
            // const { offsetX, offsetY } = e;
            const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = canvasContainerRef.current;
            if (lineActiveRef.current.top) {
                const mousePercentY = (e.pageY - offsetTop) / offsetHeight * 100;
                // const mousePercentY = offsetY / offsetHeight * 100;
                deltaY = (mousePercentY - crop.y)
                setCrop({
                    x: crop.x,
                    y: mousePercentY,
                    width: crop.width,
                    height: crop.height - deltaY,
                    borderRadius: crop.borderRadius,
                })
            }
            else if (lineActiveRef.current.right) {
                const mousePercentX = (e.pageX - offsetLeft) / offsetWidth * 100;
                deltaX = (crop.x + crop.width - mousePercentX);
                setCrop({
                    x: crop.x,
                    y: crop.y,
                    width: crop.width - deltaX,
                    height: crop.height,
                    borderRadius: crop.borderRadius,
                })
            }
            else if (lineActiveRef.current.bottom) {
                const mousePercentY = (e.pageY - 108) / offsetHeight * 100;
                deltaY = (crop.y + crop.height - mousePercentY);
                setCrop({
                    x: crop.x,
                    y: crop.y,
                    width: crop.width,
                    height: crop.height - deltaY,
                    borderRadius: crop.borderRadius,
                })
            }
            else if (lineActiveRef.current.left) {
                const mousePercentX = (e.pageX - offsetLeft) / offsetWidth * 100;
                deltaX = mousePercentX - crop.x;
                setCrop({
                    x: mousePercentX,
                    y: crop.y,
                    width: crop.width - deltaX,
                    height: crop.height,
                    borderRadius: crop.borderRadius,
                })
            }

            else if (lineActiveRef.current.topLeft) {
                const mousePercentX = (e.pageX - offsetLeft) / offsetWidth * 100;
                const mousePercentY = (e.pageY - offsetTop) / offsetHeight * 100;

                deltaX = mousePercentX - crop.x;
                deltaY = mousePercentY - crop.y;

                setCrop({
                    x: mousePercentX,
                    y: mousePercentY,
                    width: crop.width - deltaX,
                    height: crop.height - deltaY,
                    borderRadius: crop.borderRadius,
                })
            }

            else if (lineActiveRef.current.topRight) {
                const mousePercentX = (e.pageX - offsetLeft) / offsetWidth * 100;
                const mousePercentY = (e.pageY - offsetTop) / offsetHeight * 100;

                deltaX = mousePercentX - (crop.x + crop.width);
                deltaY = mousePercentY - crop.y;

                setCrop({
                    x: crop.x,
                    y: mousePercentY,
                    width: crop.width + deltaX,
                    height: crop.height - deltaY,
                    borderRadius: crop.borderRadius,
                })
            }

            else if (lineActiveRef.current.bottomRight) {
                const mousePercentX = (e.pageX - offsetLeft) / offsetWidth * 100;
                const mousePercentY = (e.pageY - offsetTop) / offsetHeight * 100;

                deltaX = mousePercentX - (crop.x + crop.width);
                deltaY = mousePercentY - (crop.y + crop.height);

                setCrop({
                    x: crop.x,
                    y: crop.y,
                    width: crop.width + deltaX,
                    height: crop.height + deltaY,
                    borderRadius: crop.borderRadius,
                })
            }

            else if (lineActiveRef.current.bottomLeft) {
                const mousePercentX = (e.pageX - offsetLeft) / offsetWidth * 100;
                const mousePercentY = (e.pageY - offsetTop) / offsetHeight * 100;

                deltaX = mousePercentX - crop.x;
                deltaY = mousePercentY - (crop.y + crop.height);

                setCrop({
                    x: mousePercentX,
                    y: crop.y,
                    width: crop.width - deltaX,
                    height: crop.height + deltaY,
                    borderRadius: crop.borderRadius,
                });
            }

            else if (lineActiveRef.current.center) {
                const deltaX = (e.pageX - centerRef.current.pageX) / offsetWidth * 100;
                const deltaY = (e.pageY - centerRef.current.pageY) / offsetHeight * 100;

                setCrop({
                    x: crop.x + deltaX,
                    y: crop.y + deltaY,
                    width: crop.width,
                    height: crop.height,
                    borderRadius: crop.borderRadius,
                });
                centerRef.current = {
                    pageX: e.pageX,
                    pageY: e.pageY,
                };
            }
            
        }
        const canvasContainerEl = canvasContainerRef.current;
        canvasContainerEl.addEventListener('mousemove', handleMouseMove);
        return () => {
            canvasContainerEl.removeEventListener('mousemove', handleMouseMove);
        }
    }, [crop]);

    const onFinish = () => {
        generateImg(imgRef.current, crop);
    }

    return (
        <>
            <NavBarInEditPage />
            <div className={styles.main}>
                <ul className={styles.tools}>
                    <li className={`${styles.toolItem} ${activeBtn === 'crop' ? styles.active : ''}`} onClick={() => setActiveBtn('crop')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" strokeLinecap="round" strokeLinejoin="round"><g><g strokeWidth=".125em" stroke="currentColor" fill="none"><path d="M23 17H9a2 2 0 0 1-2-2v-5m0-3V1 M1 7h14a2 2 0 0 1 2 2v7m0 4v3"></path></g></g></svg>
                        <span>裁剪</span>
                    </li>
                    <li className={`${styles.toolItem} ${activeBtn === 'corner' ? styles.active : ''}`} onClick={() => setActiveBtn('corner')}>
                        <svg width="512" height="512" x="0" y="0" viewBox="0 0 449.438 449.438"><g><path d="M0 109.969v52.594h38.25v-52.594c0-39.55 36.462-71.719 81.281-71.719h52.594V0h-52.594C53.617 0 0 49.333 0 109.969zM38.25 329.906v-43.031H0v43.031c0 63.677 55.854 119.531 119.531 119.531h52.594v-38.25h-52.594c-42.543.001-81.281-38.747-81.281-81.281zM411.188 329.906c0 44.819-32.168 81.281-71.719 81.281h-52.594v38.25h52.594c60.636 0 109.969-53.617 109.969-119.531v-43.031h-38.25v43.031zM339.469 0h-52.594v38.25h52.594c42.228 0 71.719 29.491 71.719 71.719v52.594h38.25v-52.594C449.438 46.254 403.193 0 339.469 0z" fill="#ffffff" data-original="#000000"></path></g></svg>
                        <span>圆角</span>
                    </li>
                </ul>
                <div className={styles.canvasWrapper} ref={canvasWrapperRef}>
                    <div className={`${styles.canvasContainer} ${styles[layout.direction]}`} ref={canvasContainerRef} style={{width: layout.calcWidth, height: layout.calcHeight}}>
                        {imgObjectURL ? (
                            <img ref={imgRef} className={styles.originalImg} src={imgObjectURL}></img>
                        ) : null}

                        {/* crop 蒙层 */}
                        <div className={`${styles.cropContainer} ${styles[activeBtn]}`} style={{left: `${crop.x}%`, top: `${crop.y}%`, width: `${crop.width}%`, height: `${crop.height}%`, borderRadius: `${crop.borderRadius}px` }}>
                            <div ref={topLineRef} className={`${styles.line} ${styles.top}`}></div>
                            <div ref={rightLineRef} className={`${styles.line} ${styles.right}`}></div>
                            <div ref={bottomLineRef} className={`${styles.line} ${styles.bottom}`}></div>
                            <div ref={leftLineRef} className={`${styles.line} ${styles.left}`}></div>
                            <div ref={topLeftCircleRef} className={`${styles.topLeft} ${styles.dragCircle}`}></div>
                            <div ref={topRightCircleRef} className={`${styles.topRight} ${styles.dragCircle}`}></div>
                            <div ref={bottomRightCircleRef} className={`${styles.bottomRight} ${styles.dragCircle}`}></div>
                            <div ref={bottomLeftCircleRef} className={`${styles.bottomLeft} ${styles.dragCircle}`}></div>
                            <div ref={centerMoveRef} className={styles.centerMove}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.subTools}>
                    {
                        activeBtn === 'corner' ? (
                            <Slider max={maxRadius} value={crop.borderRadius} onChange={(event) => {
                                setCrop({
                                    ...crop,
                                    borderRadius: event.target.value,
                                })
                            }} />
                        ) : null
                    }
                </div>
                <Button className={styles.finishBtn} size="sm" shadow color="warning" auto onClick={onFinish}>
                    完成
                </Button>
            </div>
        </>
    )
}
