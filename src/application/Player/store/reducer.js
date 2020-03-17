import * as actionTypes from './constants';
import {fromJS} from 'immutable';
import {playMode} from '../../../api/config';
import { findIndex } from '../../../api/utils';

const defaultState = fromJS({
    fullScreen: false,
    playing: false,
    sequencePlayList: [],
    playList: [],
    mode: playMode.sequence,
    currentIndex: -1, // 当前歌曲的索引
    showPlayList: false,
    currentSong: {}
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.SET_CURRENT_SONG:
            return state.set ('currentSong', action.data);
        case actionTypes.SET_FULL_SCREEN:
            return state.set ('fullScreen', action.data);
        case actionTypes.SET_PLAYING_STATE:
            return state.set ('playing', action.data);
        case actionTypes.SET_SEQUENCE_PLAYLIST:
            return state.set ('sequencePlayList', action.data);
        case actionTypes.SET_PLAYLIST:
            return state.set ('playList', action.data);
        case actionTypes.SET_PLAY_MODE:
            return state.set ('mode', action.data);
        case actionTypes.SET_CURRENT_INDEX:
            return state.set ('currentIndex', action.data);
        case actionTypes.SET_SHOW_PLAYLIST:
            return state.set ('showPlayList', action.data);
        case actionTypes.DELETE_SONG:
            return handleDeleteSong(state, action.data);
        case actionTypes.INSERT_SONG:
            return handleInsertSong(state, action.data);
        default:
            return state;
    }
}

const handleDeleteSong = (state, song) => {
    let currentIndex = state.get('currentIndex');

    const playList = state.get('playList');
    const songIndexToDelete = findIndex(song, playList.toJS());
    const newPlayList = playList.splice(songIndexToDelete, 1);

    const sequencePlayList = state.get('sequencePlayList');
    const songIndexToDelete2 = findIndex(song, sequencePlayList.toJS());
    const newSequencePlayList = sequencePlayList.splice(songIndexToDelete2, 1);
    
    if (songIndexToDelete < currentIndex) currentIndex--;

    return state
        .set('currentIndex', currentIndex)
        .set('playList', newPlayList)
        .set('sequencePlayList', newSequencePlayList);
}

const handleInsertSong = (state, song) => {
    let playList = state.get('playList');
    let sequencePlayList = state.get('sequencePlayList');
    let currentIndex = state.get('currentIndex');

    // 播放列表中是否已存在该歌曲
    let fpIndex = findIndex(song, playList.toJS());

    // 当前正在播放，直接返回
    if (fpIndex === -1) {
        playList = playList.splice(currentIndex + 1, 0, song);
    } else {
        if (fpIndex === currentIndex) {
            return state;
        } else {
            currentIndex = fpIndex;
        }
    }

    // 播放列表中是否已存在该歌曲
    let fsIndex = findIndex(song, sequencePlayList.toJS());

    // 当前正在播放，直接返回
    if (fsIndex === -1) {
        sequencePlayList = sequencePlayList.splice(currentIndex + 1, 0, song);
    } else {
        if (fsIndex === currentIndex) {
            return state;
        } else {
            currentIndex = fsIndex;
        }
    }

    return state.set('playList', playList)
        .set('sequencePlayList', sequencePlayList)
        .set('currentIndex', currentIndex);

}