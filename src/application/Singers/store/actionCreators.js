import {
    getHotSingerListRequest,
    getSingerListRequest
} from '../../../api/request';

import {
    CHANGE_SINGER_LIST,
    CHANGE_CATEGORY,
    CHANGE_ALPHA,
    CHANGE_PAGE_COUNT,
    CHANGE_PULLUP_LOADING,
    CHANGE_PULLDOWN_LOADING,
    CHANGE_ENTER_LOADING
} from './constants';

import {fromJS} from 'immutable';

const changeSingerList = (data) => ({
    type: CHANGE_SINGER_LIST,
    data: fromJS(data)
});

export const changePageCount = data => ({
    type: CHANGE_PAGE_COUNT,
    data
});

export const changeEnterLoading = data => ({
    type: CHANGE_ENTER_LOADING,
    data
});

export const changePullUpLoading = data => ({
    type: CHANGE_PULLUP_LOADING,
    data
});

export const changePullDownLoading = data => ({
    type: CHANGE_PULLDOWN_LOADING,
    data
});

export const changeCategory = data => ({
    type: CHANGE_CATEGORY,
    data
});

export const changeAlpha = data => ({
    type: CHANGE_ALPHA,
    data
});

// 第一次加载热门歌手
export const getHotSingerList = () => dispatch => {
    getHotSingerListRequest(0).then(res => {
        const data = res.artists;
        dispatch(changeSingerList(data));
        dispatch(changeEnterLoading(false));
        dispatch(changePullDownLoading(false));
    }).catch(() => {
        console.log('热门歌手获取失败')
    })
}

// 加载更多热门歌手
export const refreshMoreHotSingerList = () => (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getHotSingerListRequest(pageCount).then(res => {
        const data = [...singerList, ...res.artists];
        dispatch(changeSingerList(data));
        dispatch(changePullUpLoading(false));
    }).catch(() => {
        console.log('热门歌手获取失败')  
    })
}

// 第一次加载对应类别的歌手
export const getSingerList = (category, alpha) => dispatch => {
    getSingerListRequest(category, alpha, 0).then(res => {
        const data = res.artists;
        dispatch(changeSingerList(data));
        dispatch(changeEnterLoading(false));
        dispatch(changePullDownLoading(false));
    }).catch(() => {
        console.log('获取歌手失败');
    });
}
// 加载更多对应类别的歌手
export const refreshMoreSingerList = (category, alpha) => (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn('singers', 'singerList').toJS();
    getSingerListRequest(category, alpha, pageCount).then(res => {
        const data = [...singerList, ...res.artists];
        dispatch(changeSingerList(data));
        dispatch(changePullUpLoading(false));
    }).catch(() => {
        console.log('歌手数据获取失败');
    })
}