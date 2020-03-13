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
        default:
            return state;
    }
}

const handleDeleteSong = (state, song) => {
    const playList = JSON.parse(JSON.stringify(state.get('playList').toJS()));
    const sequencePlayList = JSON.parse(JSON.stringify(state.get('sequencePlayList').toJS()));
    let currentIndex = state.get('currentIndex');
    const songIndexToDelete = findIndex(song, playList);
    playList.splice(songIndexToDelete, 1);
    if (songIndexToDelete < currentIndex) {
        currentIndex--;
    }
    const songIndexToDelete2 = findIndex(song, sequencePlayList);
    sequencePlayList.splice(songIndexToDelete2, 1);

    return state.merge({
        playList: fromJS(playList),
        sequencePlayList: fromJS(sequencePlayList),
        currentIndex: fromJS(currentIndex)
    })
}

