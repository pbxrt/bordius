import React, {useRef, useState, useEffect} from 'react';
import {getName, prefixStyle, getFormatTime} from '../../../api/utils';
import {playMode} from '../../../api/config';
import {
    NormalPlayerContainer,
    Top,
    Middle,
    Bottom,
    Operators,
    CDWrapper,
    ProgressWrapper,
    LyricContainer,
    LyricWrapper,
} from './style';
import {CSSTransition} from 'react-transition-group';
import animations from 'create-keyframe-animation';
import ProgressBar from "../../../baseUI/progress-bar/index";
import Toast from '../../../baseUI/toast';
import Scroll from '../../../baseUI/scroll';

const transform = prefixStyle('transform');

function NormalPlayer(props) {
    const {song, fullScreen, playing, currentTime, duration, percent, mode, changeMode} = props;
    const {
        toggleFullScreen,
        clickPlaying,
        onProgressChange,
        handlePrev,
        handleNext,
        togglePlayListDispatch,
        currentLineNum,
        currentPlayingLyric,
        currentLyric
    } = props;

    const normalPlayerRef = useRef();
    const cdWrapperRef = useRef();
    const currentState = useRef('');
    const lyricScrollRef = useRef();
    const lyricLineRefs = useRef([]);

    useEffect(() => {
        if (!lyricScrollRef.current) return;
        let bScroll = lyricScrollRef.current.getBScroll();
        if (currentLineNum > 5) {
            let lineEl = lyricLineRefs.current[currentLineNum - 5].current;
            bScroll.scrollToElement(lineEl, 1000);
        } else {
            bScroll.scrollTo(0, 0, 1000);
        }
    }, [currentLineNum]);

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
        currentState.current = '';
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
        onProgressChange(percent);
    }

    const getPlayMode = () => {
        if (mode === playMode.sequence) {
            return '&#xe625;'
        }
        else if (mode === playMode.loop) {
            return '&#xe653;'
        }
        return '&#xe61b;'
    }

    const showPlayList = e => {
        e.stopPropagation();
        togglePlayListDispatch(true);
    }

    const toggleCurrentState = () => {
        if (currentState.current !== "lyric") {
            currentState.current = "lyric";
        } else {
            currentState.current = "";
        }
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
                <Middle ref={cdWrapperRef} onClick={toggleCurrentState}>
                    <CSSTransition
                        timeout={400}
                        classNames="fade"
                        in={currentState.current !== 'lyric'}
                    >
                        <CDWrapper>
                            <div className="cd">
                                <img
                                    className={`image play ${playing ? '' : 'pause'}`}
                                    src={song.al.picUrl + "?param=400x400"}
                                    alt=""
                                />
                            </div>
                        </CDWrapper>
                    </CSSTransition>
                    <CSSTransition
                        timeout={400}
                        classNames="fade"
                        in={currentState.current === 'lyric'}
                    >
                        <LyricContainer>
                            <Scroll ref={lyricScrollRef}>
                                <LyricWrapper className="lyric_wrapper">
                                    {
                                        currentLyric ? (
                                            currentLyric.lines.map((item, index) => {
                                                lyricLineRefs.current[index] = React.createRef();
                                                return (
                                                    <p
                                                        className={`text ${
                                                            currentLineNum === index ? 'current' : ''
                                                        }`}
                                                        key={item + index}
                                                        ref={lyricLineRefs.current[index]}
                                                    >
                                                        {item.txt}
                                                    </p>
                                                )
                                            })
                                        ) : (
                                            <p className="text pure"> 纯音乐，请欣赏。</p>
                                        )
                                    }
                                </LyricWrapper>
                            </Scroll>
                        </LyricContainer>
                    </CSSTransition>
                </Middle>
                <Bottom className="bottom">
                    <ProgressWrapper>
                        <span className="time time-l">{getFormatTime(currentTime)}</span>
                        <div className="progress-bar-wrapper">
                            <ProgressBar percent={percent} percentChange={onPercentChange}></ProgressBar>
                        </div>
                        <div className="time time-r">{getFormatTime(duration)}</div>
                    </ProgressWrapper>
                    <Operators>
                        <div className="icon i-left" onClick={changeMode}>
                            <i
                                className="iconfont"
                                dangerouslySetInnerHTML={{__html: getPlayMode()}}
                            ></i>
                        </div>
                        <div className="icon i-left">
                            <i className="iconfont" onClick={handlePrev}>&#xe6e1;</i>
                        </div>
                        <div className="icon i-center">
                            {
                                playing ? (
                                    <i className="iconfont" onClick={() => clickPlaying(false)}>&#xe723;</i>
                                ) : (
                                    <i className="iconfont" onClick={() => clickPlaying(true)}>&#xe731;</i>
                                )
                            }
                        </div>
                        <div className="icon i-right">
                            <i className="iconfont" onClick={handleNext}>&#xe718;</i>
                        </div>
                        <div className="icon i-right" onClick={showPlayList}>
                            <i className="iconfont">&#xe640;</i>
                        </div>
                    </Operators>
                </Bottom>
                <Toast mode={mode} />
            </NormalPlayerContainer>
        </CSSTransition>
    );
}

export default NormalPlayer;