import React from 'react';
import {ListWrapper, ListItem, List} from './style';
import { getCount } from "../../api/utils";
import LazyLoad from 'react-lazyload';
import musicPic from './music.png';
import {withRouter} from 'react-router-dom';

function RecommendList(props) {
    function enterDetail(id) {
        props.history.push(`/recommend/${id}`);
    }

    return (
        <ListWrapper>
            <h1 className="title">推荐歌单</h1>
            <List>
                {
                    props.recommendList.map((item, index) => (
                        <ListItem key={item.id + index} onClick={() => enterDetail(item.id)}>
                            <div className="img_wrapper">
                                <div className="decorate"></div>
                                <LazyLoad placeholder={<img width="100%" height="100%" src={musicPic} alt="music" />}>
                                    <img src={item.picUrl + '?param=300x300'} width="100%" height="100%" alt="img" />
                                </LazyLoad>
                                <div className="play_count">
                                    <i className="iconfont play">&#xe885;</i>
                                    <span className="count">{getCount(item.playCount)}</span>
                                </div>
                            </div>
                            <div className="desc">{item.name}</div>
                        </ListItem>
                    ))
                }
            </List>
        </ListWrapper>
    );
}

export default React.memo(withRouter(RecommendList));