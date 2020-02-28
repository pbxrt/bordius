import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
    Container,
    TopDesc,
    Menu
} from './style';
import style from '../../assets/global-style';
import {CSSTransition} from 'react-transition-group';
import Header from '../../baseUI/header/index';
import Scroll from '../../baseUI/scroll/index';
import Loading from '../../baseUI/loading/index';
import {getName, isEmptyObject} from '../../api/utils';
import {connect} from 'react-redux';
import {getAlbumList, changeEnterLoading} from './store/index';
import SongsList from '../SongList';

export const HEADER_HEIGHT = 45;

function Album (props) {
    let {currentAlbum, enterLoading} = props;
    currentAlbum = currentAlbum.toJS();
    const {getAlbumListDispatch} = props;
    const [showStatus, setShowStatus] = useState(true);
    const [title, setTitle] = useState('歌单');
    const [isMarquee, setIsMarquee] = useState(false);
    const headerEl = useRef();
    useEffect(() => {
        const id = props.match.params.id;
        getAlbumListDispatch(id);
    }, []);

    // useCallback 能够帮我们在依赖不变的情况保持一样的函数引用，最大程度地节约浏览器渲染性能。
    const handleBack = useCallback(() => {
        setShowStatus(false);
    });

    const getCount = n => {
        return (n / 10000).toFixed(1) + '万';
    }

    const handleScroll = useCallback(pos => {
        let minScrollY = -HEADER_HEIGHT;
        let rate = Math.abs(pos.y / minScrollY);
        let headerDOM = headerEl.current;

        if (pos.y < minScrollY) {
            headerDOM.style.opacity = Math.min(1, (rate - 1) * 0.25);
            if (isMarquee) return;
            headerDOM.style.backgroundColor = style['theme-color'];
            setTitle(currentAlbum.name);
            setIsMarquee(true);
        } else {
            if (!isMarquee) return;
            headerDOM.style.backgroundColor = '';
            headerDOM.style.opacity = 1;
            setTitle('歌单');
            setIsMarquee(false);
        }
    }, [currentAlbum]);

    const renderTopDesc = () => (
        <TopDesc background={currentAlbum.coverImgUrl} avatar={currentAlbum.creator.avatarUrl}>
            <div className="background">
                <div className="filter"></div>
            </div>
            <div className="img_wrapper">
                <div className="decorate"></div>
                <img src={currentAlbum.coverImgUrl} alt="cover" />
                <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{Math.floor(currentAlbum.subscribedCount/1000)/10}万</span>
                </div>
            </div>
            <div className="desc_wrapper">
                <div className="title">{currentAlbum.name}</div>
                <div className="person">
                    <div className="avatar"></div>
                    <div className="name">{currentAlbum.creator.nickname}</div>
                </div>
            </div>
            <Menu>
                <div>
                    <i className="iconfont">&#xe6ad;</i>
                    评论
                </div>
                <div>
                    <i className="iconfont">&#xe86f;</i>
                    点赞
                </div>
                <div>
                    <i className="iconfont">&#xe62d;</i>
                    收藏
                </div>
                <div>
                    <i className="iconfont">&#xe606;</i>
                    更多
                </div>
            </Menu>
        </TopDesc>
    );

    const renderSongList = () => (
        <SongsList collectCount={currentAlbum.subscribedCount} showCollect={true} songs={currentAlbum.tracks}></SongsList>
    );

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={props.history.goBack}
        >
            <Container>
                <Loading show={enterLoading} />
                <Header title={title} handleClick={handleBack} ref={headerEl} isMarquee={isMarquee}></Header>
                {
                    isEmptyObject(currentAlbum) ? null : (
                        <Scroll bounceTop={false} onScroll={handleScroll}>
                            <div>
                                {renderTopDesc()}
                                {renderSongList()}
                            </div>
                        </Scroll>
                    )
                }
            </Container>
        </CSSTransition>
    )
}

const mapStateToProps = state => ({
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    enterLoading: state.getIn(['album', 'enterLoading'])
});

const mapDispatchToProps = dispatch => ({
    getAlbumListDispatch(id) {
        dispatch(getAlbumList(id));
        dispatch(changeEnterLoading(true));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
