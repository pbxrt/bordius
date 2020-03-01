import React, {useRef, useEffect} from 'react';
import {getName} from '../../../api/utils';
import {MiniPlayerContainer} from './style';
import {CSSTransition} from 'react-transition-group';
import ProgressCircle from '../../../baseUI/progress-circle';

function MiniPlayer(props) {
    const {song, fullScreen, toggleFullScreen} = props;
    const miniPlayerRef = useRef();

    function setFullScreen(bool) {
        toggleFullScreen(true);
    }

    let percent = 0.2;

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
                <div className="poster" style={{background: `url(${song.al.picUrl}) no-repeat center center`}}>
                </div>
                <div className="text">
                    <h2 className="name">{song.name}</h2>
                    <p className="desc">{getName(song.ar)}</p>
                </div>
                <div className="control">
                    <ProgressCircle radius={32} percent={percent}>
                    </ProgressCircle>
                    <i className="icon-mini iconfont">&#xe650;</i>
                </div>
                <div className="control">
                    <i className="iconfont">&#xe640;</i>
                </div>
            </MiniPlayerContainer>
        </CSSTransition>
    );
}

export default MiniPlayer;