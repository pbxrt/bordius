import styled from 'styled-components';
import style from '../../assets/global-style';

/*

进入时的class变更情况

1. fly-appear ->
2. fly-appear fly-appear-active ->
3. fly-appear-done fly-enter-done

退出时的class变更情况

1. fly-appear-done fly-enter-done ->
2. fly-exit fly-exit-active

*/

export const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: ${style['background-color']};
    transform-origin: right bottom;
    &.fly-appear {
        transform: rotateZ(30deg) translate3d(100%, 0, 0);
    }

    &.fly-appear.fly-appear-active,
    &.fly-appear-done.fly-enter-done {
        transition: transform 0.3s;
        transform: rotateZ(0deg) translate3d(0, 0, 0);
    }

    &.fly-exit.fly-exit-active {
        transition: transform 0.3s;
        transform: rotateZ(30deg) translate3d(100%, 0, 0);
    }
`;

export const TopDesc = styled.div`
    position: relative;
    margin-bottom: 20px;
    padding: 5px 20px 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 275px;
    > .background {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(${props => props.background}) no-repeat;
        background-size: 100% 100%;
        filter: blur(20px);
        z-index: 1;
        > .filter {
            height: 100%;
            background: rgba(7, 17, 27, 0.2);
        }
    }
    > .img_wrapper {
        position: relative;
        width: 120px;
        height: 120px;
        z-index: 10;
        > .decorate {
            position: absolute;
            top: 0;
            width: 100%;
            height: 35px;
            border-radius: 3px;
            background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
        }
        > img {
            width: 120px;
            height: 120px;
            border-radius: 6px;
        }
        > .play_count {
            position: absolute;
            right: 2px;
            top: 2px;
            font-size: ${style['font-size-s']};
            line-height: 15px;
            color: ${style['font-color-light']};
            > .play {
                vertical-align: top;
            }
        }
    }
    > .desc_wrapper {
        position: relative;
        flex: 1;
        height: 120px;
        padding:0 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        z-index: 1;
        > .title {
            max-height: 70px;
            color: ${style['font-color-light']};
            font-weight: 700;
            line-height: 1.5;
            font-size: ${style["font-size-l"]};
        }
        > .person {
            display: flex;
            > .avatar {
                width: 20px;
                height: 20px;
                margin-right: 5px;
                background: url(${props => props.avatar}) no-repeat center center;
                background-size: cover;
                border-radius: 10px;
            }
            > .name {
                line-height: 20px;
                font-size: ${style["font-size-m"]};
                color: ${style["font-color-desc-v2"]};
            }
        }
    }
`;

export const Menu = styled.div`
    position: absolute;
    left: 0;
    bottom: 30px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    > div {
        display: flex;
        flex-direction: column;
        line-height: 20px;
        text-align: center;
        font-size: ${style['font-size-s']};
        color: ${style['font-color-light']};
        font-weight: 500;
        > .iconfont {
            font-size: 20px;
        }
    };
    z-index: 1;
`;