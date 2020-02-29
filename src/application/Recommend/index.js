import React, {useEffect} from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import {connect} from 'react-redux';
import * as actionTypes from './store/actionCreator';
import Scroll from '../../baseUI/scroll';
import { Content } from './style.js'
import {forceCheck} from 'react-lazyload';
import Loading from '../../baseUI/loading/index';
import {renderRoutes} from 'react-router-config';

function Recommend(props) {
    const {bannerList, recommendList, enterLoading} = props;
    const {getBannerDataDispatch, getRecommendListDataDispatch} = props;

    useEffect(() => {
        !bannerList.size && getBannerDataDispatch();
        !recommendList.size && getRecommendListDataDispatch();
        // eslint-disable-next-line
    }, []);

    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : [];

    return (
        <Content>
            <Scroll className="list" onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerListJS}></Slider>
                    <RecommendList recommendList={recommendListJS} />
                </div>
            </Scroll>
            {enterLoading && <Loading />}
            {renderRoutes(props.route.routes)}
        </Content>
    )
}

// 映射全局的 redux state 到组件的props上
const mapStateToProps = state => ({
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn(['recommend', 'enterLoading'])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
    return {
        getBannerDataDispatch() {
            dispatch(actionTypes.getBannerList());
        },
        getRecommendListDataDispatch() {
            dispatch(actionTypes.getRecommendList());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
