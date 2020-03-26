import styled from 'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: ${props => props.play > 0 ? '60px' : 0};
    width: 100%;
    z-index: 100;
    overflow: hidden;
    background: #fff;
    transform-origin: right bottom;
    transition: transform 0.3s;
    &.fly-enter, &.fly-appear {
        transform: rotateZ(30deg) translate(100%, 0);
    }
    &.fly-enter-active, &.fly-appear-acctive {
        transform: rotateZ(0deg) translate(0, 0);
    }
    &.fly-exit {
        transform: rotateZ(0deg) translate(0, 0);
    }
    &.fly-exit-active {
        transform: rotateZ(30deg) translate(100%, 0);
    }
`;

export const ImgWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 75vw;
    background: url(${props => props.bgUrl}) no-repeat top center;
    background-size: cover;
    transform-origin: center top;
    z-index: 50;
    > .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.3);
    }
`;

export const SongListContainer = styled.div`
    position: absolute;
    top: 40px;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 60;
    overflow: auto;
`;

export const CollectButton = styled.div`
    margin: calc(75vw - 100px) auto 10px;
    box-sizing: border-box;
    width: 120px;
    height: 40px;
    background: ${style["theme-color"]};
    color: ${style["font-color-light"]};
    border-radius: 20px;
    text-align: center;
    font-size: 0;
    line-height: 40px;
    > .iconfont {
        display: inline-block;
        margin-right: 10px;
        font-size: 12px;
        vertical-align: 1px;
    }
    > .text {
        display: inline-block;
        font-size: 14px;
        letter-spacing: 5px;
    }
`;