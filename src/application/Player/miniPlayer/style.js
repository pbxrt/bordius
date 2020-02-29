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
    > .poster {
        margin: 0 10px 0 20px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        &.play {
            animation: ${loop} 10s linear infinite;
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
        flex: 0 0 30px;
        padding: 0 10px;
        .iconfont,
        .icon-playlist {
            font-size: 30px;
            color: ${style["theme-color"]};
        }
        .icon-mini {
            font-size: 16px;
            position: absolute;
            left: 8px;
            top: 8px;
            &.icon-play {
                left: 9px
            }
        }
    }
`;