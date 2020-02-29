import * as actionTypes from './constants';
import {fromJS} from 'immutable';
import {getSingerInfoRequest} from '../../../api/request';

export const changeArtist = data => ({
    type: actionTypes.CHANGE_ARTIST,
    data: fromJS(data)
});

export const changeSongs = data => ({
    type: actionTypes.CHANGE_SONGS_OF_ARTIST,
    data: fromJS(data)
});

export const changeEnterLoading = data => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
});

export const getSingerInfo = id => dispatch => getSingerInfoRequest(id).then(data => {
    dispatch(changeArtist(data.artist));
    dispatch(changeSongs(data.hotSongs));
    dispatch(changeEnterLoading(false));
}).catch(err => {
    console.log('获取歌手信息出错');
});