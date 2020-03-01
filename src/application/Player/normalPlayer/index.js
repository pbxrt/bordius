import React, {useRef, useEffect, useState} from 'react';
import {getName, prefixStyle} from '../../../api/utils';
import {
    NormalPlayerContainer,
    Top,
    Middle,
    Bottom,
    Operators,
    CDWrapper,
    ProgressWrapper
} from './style';
import {CSSTransition} from 'react-transition-group';
import animations from 'create-keyframe-animation';
import ProgressBar from "../../../baseUI/progress-bar/index";

const transform = prefixStyle('transform');

function NormalPlayer(props) {
    const {song, fullScreen, toggleFullScreen} = props;

    const normalPlayerRef = useRef();
    const cdWrapperRef = useRef();

    const enter = () => {
        normalPlayerRef.current.style.display = 'block';
        const {x, y, scale} = _getPosAndScale();
        let animation = {
            0: {
                transform: `translate(${x}px, ${y}px) scale(${scale})`
            },
            60: {
                transform: `translate(0, 0) scale(1.1)`
            },
            100: {
              transform: 'translate(0, 0) scale(1)'
            }
        };
        animations.registerAnimation({
            name: 'move',
            animation,
            presets: {
                duration: 400,
                easing: 'linear'
            }
        });
        animations.runAnimation(cdWrapperRef.current, 'move');
    }

    const afterEnter = () => {
        animations.unregisterAnimation('move');
        cdWrapperRef.current.style.animation = '';
    }

    const leave = () => {
        const cdWrapperDOM = cdWrapperRef.current;
        if (!cdWrapperDOM) return;
        cdWrapperDOM.style.transition = 'all 0.4s';
        const {x, y, scale} = _getPosAndScale();
        cdWrapperDOM.style[transform] = `translate(${x}px, ${y}px) scale(${scale})`;
    }

    const afterLeave = () => {
        const cdWrapperDOM = cdWrapperRef.current;
        if (!cdWrapperDOM) return;
        cdWrapperDOM.style.transition = '';
        cdWrapperDOM.style[transform] = '';
        normalPlayerRef.current.style.display = "none";
    }

    function _getPosAndScale() {
        const targetWidth = 40;
        const paddingLeft = 40;
        const paddingBottom = 30;
        const paddingTop = 80;
        const width = window.innerWidth * 0.8;
        const scale = targetWidth / width;

        const x = -(window.innerWidth / 2 - paddingLeft);
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
        return { x, y, scale };
    }

    function onPercentChange(percent) {
        percent = Math.min(1, percent);
        console.log(percent);
    }

    return (
        <CSSTransition
            classNames="normal"
            in={fullScreen}
            timeout={400}
            mountOnEnter
            onEnter={enter}
            onEntered={afterEnter}
            onExit={leave}
            onExited={afterLeave}
        >
            <NormalPlayerContainer ref={normalPlayerRef}>
                <div className="background">
                    <img
                        src={song.al.picUrl + '?param=300x300'}
                        width='100%'
                        height='100%'
                        alt='歌曲图片'
                    />
                </div>
                <div className="background layer"></div>
                <Top className="top">
                    <div className="back" onClick={() => toggleFullScreen(false)}>
                        <i className="iconfont icon-back">&#xe662;</i>
                    </div>
                    <h1 className="title">{song.name}</h1>
                    <h1 className="subtitle">{getName(song.ar)}</h1>
                </Top>
                <Middle ref={cdWrapperRef}>
                    <CDWrapper>
                        <div className="cd">
                            <img
                                className="image play"
                                src={song.al.picUrl + "?param=400x400"}
                                alt=""
                            />
                        </div>
                    </CDWrapper>
                </Middle>
                <Bottom className="bottom">
                    <ProgressWrapper>
                        <span className="time time-l">0:00</span>
                        <div className="progress-bar-wrapper">
                            <ProgressBar percent={0.2} percentChange={onPercentChange}></ProgressBar>
                        </div>
                        <div className="time time-r">4:17</div>
                    </ProgressWrapper>
                    <Operators>
                        <div className="icon i-left" >
                            <i className="iconfont">&#xe625;</i>
                        </div>
                        <div className="icon i-left">
                            <i className="iconfont">&#xe6e1;</i>
                        </div>
                        <div className="icon i-center">
                            <i className="iconfont">&#xe723;</i>
                        </div>
                        <div className="icon i-right">
                            <i className="iconfont">&#xe718;</i>
                        </div>
                        <div className="icon i-right">
                            <i className="iconfont">&#xe640;</i>
                        </div>
                    </Operators>
                </Bottom>
            </NormalPlayerContainer>
        </CSSTransition>
    );
}

export default NormalPlayer;