import React, {useRef} from 'react';
import {getName} from '../../../api/utils';
import {MiniPlayerContainer} from './style';
import {CSSTransition} from 'react-transition-group';
import ProgressCircle from '../../../baseUI/progress-circle';

function MiniPlayer(props) {
    const {song, fullScreen, playing, percent} = props;
    const {toggleFullScreen, clickPlaying, togglePlayListDispatch} = props;
    const miniPlayerRef = useRef();

    function setFullScreen(bool) {
        toggleFullScreen(true);
    }

    const pause = (e) => {
        e.stopPropagation();
        clickPlaying(false);
    }

    const play = (e) => {
        e.stopPropagation();
        clickPlaying(true);
    }

    const showPlayList = e => {
        e.stopPropagation();
        togglePlayListDispatch(true);
    }

    return (
        <CSSTransition
            in={!fullScreen}
            timeout={400}
            classNames="mini"
            onEnter={() => {
                miniPlayerRef.current.style.display = 'flex';
            }}
            onExited={() => {
                miniPlayerRef.current.style.display = 'none';
            }}
        >
            <MiniPlayerContainer className="mini-player" ref={miniPlayerRef} onClick={() => setFullScreen(true)}>
                <div className={`poster playing ${playing ? '' : 'paused'}`} style={{background: `url(${song.al.picUrl}) no-repeat center center`}}>
                </div>
                <div className="text">
                    <h2 className="name">{song.name}</h2>
                    <p className="desc">{getName(song.ar)}</p>
                </div>
                <div className="control">
                    <ProgressCircle radius={32} percent={percent}>
                    </ProgressCircle>
                    {
                        playing ? (
                            <i className="icon-mini iconfont" onClick={pause}>&#xe650;</i>
                        ) : (
                            <i className="icon-mini iconfont icon-play" onClick={play}>&#xe61e;</i>
                        )
                    }
                </div>
                <div className="control" onClick={showPlayList}>
                    <i className="iconfont">&#xe640;</i>
                </div>
            </MiniPlayerContainer>
        </CSSTransition>
    );
}

MiniPlayer.defaultProps = {
    percent: 0,
    playing: false
}

export default MiniPlayer;