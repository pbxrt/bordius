import React, { useState, useEffect } from 'react';
import styled, {keyframes} from 'styled-components';

const ConfirmContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2000;
    > .modal {
        margin: auto;
        text-align: center;
        > header {
            height: 60px;
            width: 270px;
            border-radius: 13px 13px 0 0;
            background: #fff;
            line-height: 60px;
            color: #bbb;
        }
        opacity: 0;
        transform: scale(0);
        transition: all 0.2s cubic-bezier(.2,1.27,.62,1.09);
        &.active {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

const Row = styled.div`
    width: 270px;
    height: 42px;
    border-top: 1px solid rgb(228, 228, 228);
    display: flex;
    color:  rgb(46, 48, 48);
    font-size: 16px;
    align-items: center;
    background: #fff;
    border-radius: 0 0 13px 13px;
    > div {
        position: relative;
        width: 50%;
        box-sizing: border-box;
        height: 42px;;
        line-height: 42px;
        &:first-child {
            border-right: 1px solid rgb(228, 228, 228);
        }
    }
`

export default function Confirm(props) {
    const [modalClass, setModalClass] = useState('');
    
    useEffect(() => {
        setModalClass('active');
    }, []);

    return (
        <ConfirmContainer>
            <div className={`modal ${modalClass}`}>
                <header>{props.text}</header>
                <Row>
                    <div onClick={() => props.handleConfirm(false)}>{props.cancelBtnText}</div>
                    <div onClick={() => props.handleConfirm(true)}>{props.confirmBtnText}</div>
                </Row>
            </div>
        </ConfirmContainer>
    );
}