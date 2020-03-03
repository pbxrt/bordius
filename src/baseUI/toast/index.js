import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import PropTypes from 'prop-types';
import {playMode} from '../../api/config';

const ToastContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 120%);
    transition: transform 0.3s ease;
    font-size: 16px;
    z-index: 200;
    color: #fff;
    &.enter {
        transform: translate(-50%, -90%);
    }
`;

function Toast(props) {
    const toastRef = useRef();
    const mount = useRef(true);
    useEffect(() => {
        if (mount.current) {
            mount.current = false;
            return;
        }
        let timer1;
        let timer2;
        timer1 = setTimeout(() => {
            toastRef.current.classList.add('enter');
            timer2 = setTimeout(() => {
                toastRef.current.classList.remove('enter');
            }, 2000);
        }, 300);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        }
    }, [props.mode]);
    let message;
    if (props.mode === playMode.loop) {
        message = '单曲循环'
    } else if (props.mode === playMode.sequence) {
        message = '顺序播放'
    } else {
        message = '随机播放'
    }

    return (
        <ToastContainer ref={toastRef}>{message}</ToastContainer>
    )
}

export default React.memo(Toast);