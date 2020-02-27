import styled from 'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: ${style['background-color']};
    transform-origin: right bottom;
    &.fly-appear, &.fly-enter {
        transform: rotateZ(30deg) translate3d(100%, 0, 0);
    }
    &.fly-appear-active, &.fly-enter-active {
        transition: transform 0.3s;
        transform: rotateZ(0deg) translate3d(0, 0, 0);
    }
    &.fly-exit {
        transform: rotateZ(0deg) translate3d(0, 0, 0);
    }
    &.fly-exit-active {
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
            font-size: ${style ["font-size-l"]};
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
                font-size: ${style ["font-size-m"]};
                color: ${style ["font-color-desc-v2"]};
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

export const SongList = styled.div`
    border-radius: 10px;
    opacity: 0.98;
    ${props => props.showBackground ? `background: ${style['highlight-background-color']}` : ''}
    > .first_line {
        box-sizing: border-box;
        padding: 10px 0;
        margin-left: 10px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid ${style['border-color']};
        > .play_all {
            display: flex;
            align-items: center;
            line-height: 24px;
            color: ${style['font-color-desc']};
            > .icon-font {
                font-size: 24px;
                margin-right: 10px;
            }
            .sum {
                font-size: ${style['font-size-s']};
                color: ${style ["font-color-desc-v2"]};
            }
        }
        .add_list, .isCollected {
            display: flex;
            align-items: center;
            width: 130px;
            background: ${style['theme-color']};
            color: ${style['font-color-light']};
            border-radius: 3px;
            > .iconfont {
                font-size: 10px;
                margin: 0 5px 0 10px;
            }
            > span {
                font-size: 14px;
                line-height: 34px;
            }
        }
        .isCollected {
            display: flex;
            background: ${style['background-color']};
            color: ${style['font-color-desc']};
        }
    }
`;

export const SongItem = styled.ul`
    > li {
        height: 60px;
        display: flex;
        align-items: center;
        > .index {
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
        }
        > .info {
            box-sizing: border-box;
            flex: 1;
            display: flex;
            height: 100%;
            padding: 5px 0;
            flex-direction: column;
            justify-content: space-around;
            border-bottom: 1px solid ${style['border-color']};
            ${style.noWrap()}
            > span {
                ${style.noWrap()}
            }
            > span:first-child {
                color: ${style['font-color-desc']};
            }
            > span:last-child {
                font-size: ${style['font-size-s']};
                color: #bba8a8;
            }
        }
    }
`;