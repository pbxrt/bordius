import React, {useRef, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
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
    const {fullScreen} = props;
    const {toggleFullScreenDispatch} = props;
    const song = {
        ar: [{name: "薛之谦"}],
        name: '测试',
        al: {
            picUrl: 'http://p2.music.126.net/OuL80LuI347696oR98b3SA==/109951164738867906.jpg'
        }
    };
    return (
        <div className="players-container">
            <MiniPlayer
                song={song}
                fullScreen={fullScreen}
                toggleFullScreen={toggleFullScreenDispatch}
            />
            <NormalPlayer
                song={song}
                fullScreen={fullScreen}
                toggleFullScreen={toggleFullScreenDispatch}  
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
    sequencePlayList: state.getIn(["player", "sequencePlayList"])
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