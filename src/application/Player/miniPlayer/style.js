import styled, {keyframes} from 'styled-components';
import style from '../../../assets/global-style';

const loop = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const MiniPlayerContainer = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 60px;
    display: flex;
    align-items: center;
    background: #fff;
    z-index: 300;
    transition: all .4s linear;
    &.mini-enter {
        transform: translate3d(0, 100%, 0);
    }
    &.mini-enter-active,
    &.mini-enter-done {
        transform: translate3d(0, 0, 0);
    }
    &.mini-exit-active,
    &.mini-exit-done {
        transform: translate3d(0, 100%, 0);
    }
    > .poster {
        margin: 0 10px 0 20px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        &.playing {
            animation: ${loop} 10s linear infinite;
            &.paused {
                animation-play-state: paused;
            }
        }
    }
    > .text {
        flex: 1;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        > h2 {
            font-size: 14px;
            color: rgb(46, 48, 48);
            ${style['noWrap']()}
        }
        >.desc {
            font-size: 12px;
            color: rgb(187, 168, 168);
            ${style['noWrap']()}
        }
    }
    > .control {
        position: relative;
        margin: 0 10px;
        width: 30px;
        height: 30px;
        .iconfont,
        .icon-playlist {
            font-size: 30px;
            color: ${style["theme-color"]};
        }
        .icon-mini {
            position: absolute;
            font-size: 16px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            &.icon-play {
                transform: translate(-40%, -50%);
            }
        }
    }
`;