import React, {useState, useEffect} from 'react';
import Horizen from '../../baseUI/horizen-item';
import {categoryTypes, alphaTypes} from '../../api/config';
import { NavContainer, ListContainer, List, ListItem } from './style';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';
import {connect} from 'react-redux';
import LazyLoad, {forceCheck} from 'react-lazyload';
import holderImg from './singer.png';
import {
    getSingerList,
    getHotSingerList,
    changeEnterLoading,
    changePageCount,
    refreshMoreSingerList,
    changePullUpLoading,
    changePullDownLoading,
    refreshMoreHotSingerList,
    changeCategory,
    changeAlpha
} from './store/actionCreators';
import {renderRoutes} from 'react-router-config';

function Singers(props) {
    const {
        category,
        alpha,
        singerList,
        pageCount,
        pullUpLoading,
        pullDownLoading,
        enterLoading
    } = props;
    const {
        getHotSingerDispatch,
        updateDispatch,
        pullUpRefreshDispatch,
        pullDownRefreshDispatch
    } = props;
    
    function handleUpdateCategory(val) {
        updateDispatch(val, alpha);
    }

    function handleUpdateAlpha(val) {
        updateDispatch(category, val);
    }

    useEffect(() => {
        getHotSingerDispatch();
    }, []);

    const handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, category === '', pageCount)
    }

    const handlePullDown = () => {
        pullDownRefreshDispatch(category, alpha);
    }

    const renderSingerList = () => {
        const list = singerList.toJS();
        const enterDetail = id => props.history.push(`/singers/id`);
        return (
            <List>
                {
                    list.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + '' + index} onClick={() => enterDetail(item.id)}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={holderImg} alt="music" />}>
                                        <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                                    </LazyLoad>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        );
    }

    return (
        <div>
            <NavContainer>
                <Horizen
                    list={categoryTypes}
                    title={"分类（默认热门）："}
                    oldVal={category}
                    handleClick={handleUpdateCategory}>
                </Horizen>
                <Horizen
                    list={alphaTypes}
                    title={"首字母："}
                    oldVal={alpha}
                    handleClick={handleUpdateAlpha}>
                </Horizen>
            </NavContainer>
            <ListContainer>
                <Loading show={enterLoading}></Loading>
                <Scroll
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                    onScroll={forceCheck}
                >
                    {renderSingerList(singerList.toJS())}
                </Scroll>
            </ListContainer>
            {renderRoutes(props.route.routes)}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        singerList: state.getIn(['singers', 'singerList']),
        enterLoading: state.getIn(['singers', 'enterLoading']),
        pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
        pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
        pageCount: state.getIn(['singers', 'pageCount']),
        category: state.getIn(['singers', 'category']),
        alpha: state.getIn(['singers', 'alpha'])
    };
};

const mapDispatchToProps = dispatch => ({
    getHotSingerDispatch() {
        dispatch(getHotSingerList());
    },

    updateDispatch(category, alpha) {
        dispatch(changeCategory(category));
        dispatch(changeAlpha(alpha));
        dispatch(changePageCount(0));
        dispatch(changeEnterLoading(true));
        dispatch(getSingerList(category, alpha));
    },

    pullUpRefreshDispatch(category, alpha, hot, count) {
        dispatch(changePullUpLoading(true));
        dispatch(changePageCount(count + 1));
        if (hot) {
            dispatch(refreshMoreHotSingerList());
        } else {
            dispatch(refreshMoreSingerList(category, alpha));
        }
    },

    pullDownRefreshDispatch(category, alpha) {
        dispatch(changePullDownLoading(true));
        dispatch(changePageCount(0));
        if (category === '' || alpha === '') {
            dispatch(getHotSingerList());
        } else {
            dispatch(getSingerList(category, alpha));
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
