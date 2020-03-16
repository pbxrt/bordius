import React, { useState, useEffect, useCallback } from 'react';
import  { CSSTransition } from 'react-transition-group';
import SearchBox from '../../baseUI/search-box';
import { connect } from 'react-redux';
import {
    getHotKeyWords,
    getSuggestList,
    changeEnterLoading
} from './store';
import {
    Container,
    ShortcutWrapper,
    HotKey,
    List,
    ListItem,
    SongItem
} from './style';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading/index';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { getName } from '../../api/utils';
import singerPic from './singer.png';
import musicPic from './music.png';

function Search(props) {
    const {
        hotList, 
        enterLoading, 
        suggestList: immutableSuggestList, 
        songsCount, 
        songsList: immutableSongsList
    } = props;
    const suggestList = immutableSuggestList.toJS ();
    const songsList = immutableSongsList.toJS ();
    const {
        getHotKeyWordsDispatch,
        changeEnterLoadingDispatch,
        getSuggestListDispatch,
        getSongDetailDispatch
    } = props;

    const [show, setShow] = useState(false);
    const [query, setQuery] = useState('');

    useEffect (() => {
        setShow (true);
        if (!hotList.size)
        getHotKeyWordsDispatch();
    }, []);

    const searchBack = useCallback(() => {
        setShow(false);
    }, []);

    const handleQuery = q => {
        setQuery(q);
        if (!q) return;
        changeEnterLoadingDispatch(true);
        getSuggestListDispatch(q);
    };
    const renderHotKey = () => {
        let list = hotList.toJS();
        return (
            <ul>
                {
                    list.map (item => {
                        return (
                            <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
                                <span>{item.first}</span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    };

    const renderSingers = () => {
        return null;
        let singers = suggestList.artists;
        if (!singers || !singers.length) return null;
        return (
            <List>
                <h1 className="title"> 相关歌手 </h1>
                {
                    singers.map((item, index) => {
                        return (
                            <ListItem key={item.accountId+""+index}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={singerPic} alt="singer"/>}>
                                        <img src={item.picUrl} width="100%" height="100%" alt="music"/>
                                    </LazyLoad>
                                </div>
                                <span className="name"> 歌手: {item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };

    const renderAlbum = () => {
        let albums = suggestList.playlists;
        if (!albums || !albums.length) return null;
        return (
            <List>
                <h1 className="title"> 相关歌单 </h1>
                {
                    albums.map((item, index) => {
                        return (
                            <ListItem key={item.accountId+""+index}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={musicPic} alt="music"/>}>
                                        <img src={item.coverImgUrl} width="100%" height="100%" alt="music"/>
                                    </LazyLoad>
                                </div>
                                <span className="name"> 歌单: {item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };
    const renderSongs = () => {
        return (
            <SongItem style={{paddingLeft: "20px"}}> 
                {
                    songsList.map (item => {
                        return (
                            <li key={item.id}>
                                <div className="info">
                                    <span>{item.name}</span>
                                    <span>
                                        {getName(item.artists)} - {item.album.name}
                                    </span>
                                </div>
                            </li>
                        )
                    })
                }
            </SongItem>
        )
    };

    return (
        <CSSTransition
            in={show}
            timeout={300}
            appear={true}
            classNames="fly"
            unmountOnExit
            onExited={() => props.history.goBack()}
        >
            <Container>
                <div className="search_box_wrapper">
                    <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
                </div>
                <ShortcutWrapper show={!query}>
                    <Scroll>
                        <div>
                            <HotKey>
                                <h1 className="title"> 热门搜索 </h1>
                                {renderHotKey()}
                            </HotKey>
                        </div>
                    </Scroll>
                </ShortcutWrapper>
                <ShortcutWrapper show={query}>
                    <Scroll onScroll={forceCheck}>
                        <div>
                            {renderSingers()}
                            {renderAlbum()}
                            {renderSongs()}
                        </div>
                    </Scroll>
                </ShortcutWrapper>
                <Loading show={enterLoading}></Loading>
            </Container>
        </CSSTransition>
    );
}

const mapStateToProps = (state) => ({
    hotList: state.getIn(['search', 'hotList']),
    enterLoading: state.getIn(['search', 'enterLoading']),
    suggestList: state.getIn(['search', 'suggestList']),
    songsCount: state.getIn(['player', 'playList']).size,
    songsList: state.getIn(['search', 'songsList'])
});

const mapDispatchToProps = dispatch => ({
    getHotKeyWordsDispatch() {
        dispatch(getHotKeyWords());
    },
    changeEnterLoadingDispatch(data) {
        dispatch(changeEnterLoading(data))
    },
    getSuggestListDispatch (data) {
        dispatch(getSuggestList(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search));
