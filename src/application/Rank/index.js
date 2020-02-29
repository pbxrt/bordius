import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getRankList} from './store/index';
import {filterIndex} from '../../api/utils';
import Loading from '../../baseUI/loading';
import Scroll from '../../baseUI/scroll/index';
import {
    Container,
    List,
    ListItem,
    SongList
} from './style';

import {renderRoutes} from 'react-router-config';

function Rank(props) {
    const {rankList, loading, history} = props;
    const {getRankListDataDispatch} = props;
    const list = rankList.toJS();
    let globalStartIndex = 0;
    let officialList = [];
    let globalList = [];
    if (list.length) {
        globalStartIndex = filterIndex(list);
        officialList = list.slice(0, globalStartIndex);
        globalList = list.slice(globalStartIndex);
    }

    let displayStyle = loading ? {visibility: 'hidden'} : {visibility: 'visible'};

    useEffect(() => {
        getRankListDataDispatch();
        // eslint-disable-next-line
    }, []);

    const enterDetail = (detail) => {
        history.push(`/rank/${detail.id}`);
    }

    const renderSongList = list => (
        list.length ? (
            <SongList>
                {
                    list.map((item, index) => (
                        <li key={index}>{index+1}.{item.first}-{item.second}</li>
                    ))
                }
            </SongList>
        ) : null
    );

    const renderRankList = (list, global) => {
        return (
            <List globalRank={global}>
                {
                    list.map(item => (
                        <ListItem key={item.coverImgUrl} tracks={item.tracks} onClick={() => enterDetail(item)}>
                            <div className="img_wrapper">
                                <img src={item.coverImgUrl} alt="music" />
                                <div className="decorate"></div>
                                <span className="update_frequency">{item.updateFrequency}</span>
                            </div>
                            {renderSongList(item.tracks)}
                        </ListItem>
                    ))
                }
            </List>
        )
    }


    return (
        <Container>
            <Scroll>
                <div>
                    <h1 className="official" style={displayStyle}> 官方榜 </h1>
                    {renderRankList(officialList)}
                    <h1 className="global" style={displayStyle}> 全球榜 </h1>
                    {renderRankList(globalList, true)}
                    {loading ? <Loading /> : null}
                </div>
            </Scroll>
            {renderRoutes(props.route.routes)}
        </Container>
    )
}

const mapStateToProps = state => ({
    rankList: state.getIn(['rank', 'rankList']),
    loading: state.getIn(['rank', 'loading'])
});

const mapDispatchToProps = dispatch => ({
    getRankListDataDispatch() {
        dispatch(getRankList());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withRouter(Rank)));

