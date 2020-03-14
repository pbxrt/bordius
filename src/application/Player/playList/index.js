import React, { useRef, useState, useCallback } from 'react';
import {connect} from "react-redux";
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from './style';
import { CSSTransition } from 'react-transition-group';
import {
    changeShowPlayList,
    changeCurrentIndex,
    changePlayMode,
    changePlayList,
    changeCurrentSong,
    changeSequencePlayList,
    changePlayingState,
    deleteSong,
} from '../store';
import { prefixStyle, getName, shuffle, findIndex } from '../../../api/utils';
import { playMode } from '../../../api/config';
import Scroll from '../../../baseUI/scroll';
import Confirm from '../../../baseUI/confirm';

function PlayList(props) {
    const {
        showPlayList,
        currentSong: immutableCurrentSong,
        currentIndex,
        playList: immutablePlayList,
        mode,
        sequencePlayList: immutableSequencePlayList
    } = props;
    const {
        togglePlayListDispatch,
        changeCurrentIndexDispatch,
        changePlayListDispatch,
        changeModeDispatch,
        deleteSongDispatch,
        clearDispatch,
    } = props;
    const currentSong = immutableCurrentSong.toJS();
    const playList = immutablePlayList.toJS();
    const sequencePlayList = immutableSequencePlayList.toJS();
    const playListRef = useRef();
    const listWrapperRef = useRef();
    const [showConfirm, setShowConfirm] = useState(false);

    // CSSTransition 永远挂载，但它包裹的Container只有 onEnter时才挂载
    const [isShow, setIsShow] = useState(false);

    function hidePlayList(e) {
        if (e.target === playListRef.current) {
            togglePlayListDispatch(false);
        }
    }

    const transform = prefixStyle('transform');
    const onEnterCB = useCallback(() => {
        setIsShow(true);
        listWrapperRef.current.style[transform] = 'translate3d(0, 100%, 0)';
    }, [transform]);

    const onEnteringCB = useCallback(() => {
        listWrapperRef.current.style.transition = 'all .3s';
        listWrapperRef.current.style[transform] = 'translate3d(0, 0, 0)';
    }, [transform]);

    const onExitingCB = useCallback(() => {
        listWrapperRef.current.style.transition = 'all .3s';
        listWrapperRef.current.style[transform] = 'translate3d(0, 100%, 0)';
    }, [transform]);

    const onExitedCB = useCallback(() => {
        setIsShow(false);
        listWrapperRef.current.style[transform] = 'translate3d(0, 100%, 0)';
    }, [transform]);

    const getCurrentIcon = (item) => {
        // 是不是当前正在播放的歌曲
        const current = currentSong.id === item.id;
        const className = current ? 'icon-play' : '';
        const content = current ? '&#xe6e3;': '';
        return (
            <i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{__html:content}}></i>
        );
    };

    const getPlayMode = () => {
        let content, text;
        if (mode === playMode.sequence) {
            content = "&#xe625;";
            text = "顺序播放";
        } else if (mode === playMode.loop) {
            content = "&#xe653;";
            text = "单曲循环";
        } else {
            content = "&#xe61b;";
            text = "随机播放";
        }
        return (
            <div>
                <i className="iconfont" onClick={changeMode}  dangerouslySetInnerHTML={{__html: content}}></i>
                <span className="text" onClick={changeMode}>{text}</span>
            </div>
        )
    }

    const changeMode = () => {
        let newMode = (mode + 1) % 3;
        if (newMode === 0) {
            changePlayListDispatch(sequencePlayList);
            let index = findIndex(currentSong, sequencePlayList);
            changeCurrentIndexDispatch (index);
        } else if (newMode === 1) {
            changePlayListDispatch(sequencePlayList);
        } else if (newMode === 2) {
            let newList = shuffle(sequencePlayList);
            let index = findIndex(currentSong, newList);
            changePlayListDispatch(newList);
            changeCurrentIndexDispatch(index);
        }
        changeModeDispatch(newMode);
    }

    const handleShowClear = () => {
        setShowConfirm(true);
    }

    const handleChangeCurrentIndex = index => {
        if (currentIndex === index) return;
        changeCurrentIndexDispatch(index);
    }

    const handleDeleteSong = (e, song) => {
        e.stopPropagation();
        deleteSongDispatch(song);
    }

    const handleConfirm = (bool) => {
        setShowConfirm(false);
        if (!bool) return;
        clearDispatch();
    }

    return (
        <CSSTransition
            in={showPlayList}
            timeout={300}
            classNames="list-fade"
            onEnter={onEnterCB}
            onEntering={onEnteringCB}
            onExiting={onExitingCB}
            onExited={onExitedCB}
        >
            <PlayListWrapper
                onClick={hidePlayList}
                ref={playListRef}
                style={{display: isShow ? 'block' : 'none'}}
            >
                <div className="list_wrapper" ref={listWrapperRef}>
                    <ListHeader>
                        <h1 className="title">
                            {getPlayMode()}
                            <span className="iconfont clear" onClick={handleShowClear}>&#xe63d;</span>
                        </h1>
                    </ListHeader>
                    <ScrollWrapper>
                        <Scroll>
                            <ListContent>
                                {
                                    playList.map ((item, index) => {
                                        return (
                                            <li className="item" key={item.id} onClick={() => handleChangeCurrentIndex(index)}>
                                                {getCurrentIcon(item)}
                                                <span className="text">{item.name} - {getName (item.ar)}</span>
                                                <span className="like">
                                                    <i className="iconfont">&#xe601;</i>
                                                </span>
                                                <span className="delete" onClick={e => handleDeleteSong(e, item)}>
                                                    <i className="iconfont">&#xe63d;</i>
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ListContent>
                        </Scroll>
                    </ScrollWrapper>
                </div>
                { showConfirm &&
                    <Confirm
                        text={"是否删除全部?"}
                        cancelBtnText={"取消"}
                        confirmBtnText={"确定"}
                        handleConfirm={handleConfirm}
                    />
                }
            </PlayListWrapper>
        </CSSTransition>
    )
}

const mapStateToProps = state => ({
    showPlayList: state.getIn(['player', 'showPlayList']),
    currentIndex: state.getIn(['player', 'currentIndex']),
    currentSong: state.getIn(['player', 'currentSong']),
    playList: state.getIn(['player', 'playList']),
    sequencePlayList: state.getIn(['player', 'sequencePlayList']),
    mode: state.getIn(['player', 'mode'])
});

const mapDispatchToProps = dispatch => ({
    togglePlayListDispatch(data) {
        dispatch(changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index) {
        dispatch(changeCurrentIndex(index));
    },
    changeModeDispatch(data) {
        dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data) {
        dispatch(changePlayList(data));
    },
    deleteSongDispatch(data) {
        dispatch(deleteSong(data));
    },
    clearDispatch() {
        dispatch(changePlayList([]));
        dispatch(changeSequencePlayList([]));
        dispatch(changeCurrentIndex(-1));
        dispatch(changeShowPlayList(false));
        dispatch(changeCurrentSong({}));
        dispatch(changePlayingState(false));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(PlayList));