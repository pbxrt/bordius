import React from 'react';
import {connect} from "react-redux";
import { PlayListWrapper, ScrollWrapper } from './style';
import {
    changeShowPlayList,
} from '../store';

function PlayList(props) {
    const { showPlayList } = props;
    const { togglePlayListDispatch } = props;

    function hidePlayList(e) {
        console.log('container');
        togglePlayListDispatch(false);
    }

    function stopProp(e) {
        e.stopPropagation();
    }

    return (
        <PlayListWrapper onClick={hidePlayList}>
            <div className="list_wrapper" onClick={stopProp}>
                <ScrollWrapper>
                </ScrollWrapper>
            </div>
        </PlayListWrapper>
    )
}

const mapStateToProps = state => ({
    showPlayList: state.getIn(['player', 'showPlayList'])
});

const mapDispatchToProps = dispatch => ({
    togglePlayListDispatch(data) {
        dispatch(changeShowPlayList(data));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(PlayList));