import React, {useRef, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import PlayList from './playList';
import {getSongUrl, isEmptyObject, shuffle, findIndex} from '../../api/utils';
import { getLyricRequest } from '../../api/request';
import Lyric from '../../api/lyric-parser';
import {playMode} from '../../api/config';
import {
    changePlayingState,
    changeShowPlayList,
    changeCurrentIndex,
    changeCurrentSong,
    changePlayList,
    changePlayMode,
    changeFullScreen
} from './store';

function Player(props) {
    const {
        fullScreen,
        playing,
        currentIndex,
        currentSong: immutableCurrentSong,
        mode,
        sequencePlayList: immutableSequencePlayList,
        playList: immutablePlayList,
        showPlayList
    } = props;
    const {
        toggleFullScreenDispatch,
        togglePlayingDispatch,
        changeCurrentIndexDispatch,
        changeCurrentDispatch,
        changePlayListDispatch,
        changeModeDispatch,
        togglePlayListDispatch
    } = props;

    const playList = immutablePlayList.toJS();
    const sequencePlayList = immutableSequencePlayList.toJS();
    const currentSong = immutableCurrentSong.toJS();
    // 目前播放时间
    const [currentTime, setCurrentTime] = useState(0);

    // 歌曲总时长
    const [duration, setDuration] = useState(0);

    const audioRef = useRef();

    const [preSong, setPreSong] = useState({});

    const songReady = useRef(true);

    const currentLyric = useRef();
    const currentLineNum = useRef();
    const [currentPlayingLyric, setPlayingLyric] = useState('');

    const handleLyric = ({lineNum, txt}) => {
        if (!currentLyric.current) return;
        currentLineNum.current = lineNum;
        setPlayingLyric(txt);
    }

    useEffect(() => {
        if (!currentSong.id) return;
        getLyric(currentSong.id);
        setCurrentTime(0);
        setDuration((currentSong.dt / 1000) | 0);
    }, [currentSong.id]);

    const getLyric = id => {
        let lyric = '';
        if (currentLyric.current) {
            currentLyric.current.stop();
        }

        getLyricRequest(id).then(data => {
            lyric = data.lrc.lyric;
            if (!lyric) {
                currentLyric.current = null;
                return;
            }
            currentLyric.current = new Lyric(lyric, handleLyric);
            currentLyric.current.play();
            currentLineNum.current = 0;
            currentLyric.current.seek(0);
        }).catch(err => {
            console.log(err);
            songReady.current = true;
            audioRef.currrent.play();
        })
    }



    useEffect(() => {
        changeCurrentIndexDispatch(0);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (
            !playList.length ||
            currentIndex === -1 ||
            !playList[currentIndex] ||
            playList[currentIndex].id === preSong.id ||
            !songReady.current
        )
            return;

        let current = playList[currentIndex];
        changeCurrentDispatch(current);
        setPreSong(current);
        audioRef.current.src = getSongUrl(current.id);
        songReady.current = false; // 赋值 src 属性后，需要加载歌曲资源，此时还未播放，状态位置为 false
        setTimeout(() => {
            audioRef.current.play().then(() => {
               songReady.current = true;
            });
        });
        togglePlayingDispatch(true);
        setCurrentTime(0);
        setDuration((current.dt / 1000) | 0);
    }, [playList, currentIndex]);

    const mount = useRef(true);
    useEffect(() => {
        if (mount.current) {
            mount.current = false;
            return;
        }
        if (playing) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [playing]);

    const updateTime = e => {
        setCurrentTime(e.target.currentTime);
    };

    const handleEnd = () => {
        if (mode === playMode.loop) {
            handleLoop();
        } else {
            handleNext();
        }
    }

    // 歌曲播放进度
    let percent = (currentTime / duration) || 0;

    function onProgressChange(currPercent) {
        const newTime = currPercent * duration;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
        if (!playing) {
            togglePlayingDispatch(true);
        }
        if (currentLyric.current) {
            currentLyric.current.seek(newTime * 1000);
        }
    }

    const handleLoop = () => {
        audioRef.current.currentTime = 0;
        togglePlayingDispatch(true);
        audioRef.current.play();
    }

    const handlePrev = () => {
        // 总共只有一首歌
        if (playList.length === 1) {
            return handleLoop();
        }
        let index = currentIndex - 1;
        if (index < 0) index = playList.length - 1;
        if (!playing) togglePlayingDispatch(true);
        changeCurrentIndexDispatch(index);
    }

    const handleNext = () => {
        if (playList.length === 1) {
            return handleLoop();
        }
        let index = currentIndex + 1;
        if (index === playList.length) index = 0;
        if (!playing) togglePlayingDispatch(true);
        changeCurrentIndexDispatch(index);
    }

    const changeMode = () => {
        let newMode = (mode + 1) % 3;
        if (newMode === 0) {
            // 顺序播放
            changePlayListDispatch(sequencePlayList);
            let index = findIndex(currentSong, sequencePlayList);
            changeCurrentIndexDispatch(index);
        }
        else if (newMode === 1) {
            // 单曲循环
            changePlayListDispatch(sequencePlayList);
        }
        else if (newMode === 2) {
            // 随机播放
            let newList = shuffle(sequencePlayList);
            let index = findIndex(currentSong, newList);
            changePlayListDispatch(newList);
            changeCurrentIndexDispatch(index);
        }
        changeModeDispatch(newMode);
    }

    const handleError = (err) => {
        songReady.current = true;
        alert('播放出错');
        console.log(err);
    };

    const clickPlaying = () => {
        if (currentLyric.current) {
            currentLyric.current.togglePlay(currentTime * 1000);
        }
    }

    return (
        <div className="players-container">
            {
                !isEmptyObject(currentSong) && (
                    <>
                        <MiniPlayer
                            song={currentSong}
                            fullScreen={fullScreen}
                            toggleFullScreen={toggleFullScreenDispatch}
                            playing={playing}
                            clickPlaying={togglePlayingDispatch}
                            percent={percent}
                            togglePlayListDispatch={togglePlayListDispatch}
                        />
                        <NormalPlayer
                            song={currentSong}
                            fullScreen={fullScreen}
                            toggleFullScreen={toggleFullScreenDispatch}
                            playing={playing}
                            clickPlaying={togglePlayingDispatch}
                            duration={duration}
                            currentTime={currentTime}
                            percent={percent}
                            onProgressChange={onProgressChange}
                            handlePrev={handlePrev}
                            handleNext={handleNext}
                            mode={mode}
                            changeMode={changeMode}
                            togglePlayListDispatch={togglePlayListDispatch}
                            currentLyric={currentLyric.current}
                            currentPlayingLyric={currentPlayingLyric}
                            currentLineNum={currentLineNum.current}
                        />
                        <PlayList></PlayList>
                        
                    </>
                )
            }
            <audio
                ref={audioRef}
                onTimeUpdate={updateTime}
                onEnded={handleEnd}
                onError={handleError}
            />
        </div>
    );
}

const mapStateToProps = state =>({
    fullScreen: state.getIn(['player', 'fullScreen']),
    playing: state.getIn(["player", "playing"]),
    currentSong: state.getIn(["player", "currentSong"]),
    showPlayList: state.getIn(["player", "showPlayList"]),
    mode: state.getIn(["player", "mode"]),
    currentIndex: state.getIn(["player", "currentIndex"]),
    playList: state.getIn(["player", "playList"]),
    sequencePlayList: state.getIn(["player", "sequencePlayList"]),
    album: state.getIn(['album', 'currentAlbum'])
});

const mapDispatchToProps = dispatch =>({
    togglePlayingDispatch(data) {
        dispatch(changePlayingState(data));
    },
    toggleFullScreenDispatch(data) {
        dispatch(changeFullScreen(data));
    },
    togglePlayListDispatch(data) {
        dispatch(changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index) {
        dispatch(changeCurrentIndex(index));
    },
    changeCurrentDispatch(data) {
        dispatch(changeCurrentSong(data));
    },
    changeModeDispatch(data) {
        dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data) {
        dispatch(changePlayList(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));