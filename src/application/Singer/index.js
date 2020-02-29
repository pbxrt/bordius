import React, {useState, useRef, useEffect, useCallback} from 'react';
import {CSSTransition} from 'react-transition-group';
import {
    Container,
    ImgWrapper,
    CollectButton,
    BgLayer,
    SongListWrapper,
} from './style';
import Header from '../../baseUI/header';
import Loading from '../../baseUI/loading';
import SongsList from '../SongList';
import Scroll from '../../baseUI/scroll';
import {HEADER_HEIGHT} from '../../api/config';
import {connect} from 'react-redux';
import {getSingerInfo} from './store';

function Singer(props) {
    const {artist: immutableArtist, songs: immutableSongs, loading} = props;
    const {getSingerInfoDispatch} = props;
    const artist = immutableArtist.toJS();
    const songs = immutableSongs.toJS();
    const [showStatus, setShowStatus] = useState(true);
    const collectButton = useRef();
    const imageWrapper = useRef();
    const songScrollWrapper = useRef();
    const songScroll = useRef();
    const header = useRef();
    const layer = useRef();
    // picture initial height
    const initialHeight = useRef(0);

    const OFFSET = 5;

    useEffect(() => {
        let h = imageWrapper.current.offsetHeight;
        songScrollWrapper.current.style.top = `${h - OFFSET}px`;
        initialHeight.current = h;
        layer.current.style.top = `${h - OFFSET}px`;
        songScroll.current.refresh();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getSingerInfoDispatch(props.match.params.id);
        // eslint-disable-next-line
    }, []);

    const handleScroll = useCallback(pos => {
        let height = initialHeight.current;
        const newY = pos.y;
        const imageDOM = imageWrapper.current;
        const buttonDOM = collectButton.current;
        const headerDOM = header.current;
        const layerDOM = layer.current;
        const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

        const percent = Math.abs(newY / height);

        // 下拉
        if (newY > 0) {
            imageDOM.style.transform = `scale(${1 + percent})`;
            buttonDOM.style.transform = `translateY(${newY}px)`;
            layerDOM.style.top = `${height - OFFSET + newY}px`;
        }

        else if (newY >= minScrollY) {
            layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
            layerDOM.style.zIndex = 1;;
            imageDOM.style.paddingTop = '75%';
            imageDOM.style.height = 0;
            imageDOM.style.zIndex = -1;

            buttonDOM.style.transform = `translateY(${newY}px)`;
            buttonDOM.style.opacity = `${1 - percent * 2}`;
        }

        else if (newY < minScrollY) {
            // 已经滑过 Header
            layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
            layerDOM.style.zIndex = 1;
            headerDOM.style.zIndex = 100;
            imageDOM.style.height = `${HEADER_HEIGHT}px`;
            imageDOM.style.paddingTop = 0;
            imageDOM.style.zIndex = 99;
        }
    }, []);

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => props.history.goBack()}
        >
            <Container>
                <Loading show={loading} />
                <Header
                    title={"头部"}
                    handleClick={() => setShowStatus(false)}
                    ref={header}
                ></Header>
                <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
                    <div className="filter"></div>
                </ImgWrapper>
                <CollectButton ref={collectButton}>
                    <i className="iconfont">&#xe62d;</i>
                    <span className="text">收藏</span>
                </CollectButton>
                <BgLayer ref={layer}></BgLayer>
                <SongListWrapper ref={songScrollWrapper}>
                    <Scroll ref={songScroll} onScroll={handleScroll}>
                        <SongsList songs={songs} showCollect={false}></SongsList>
                    </Scroll>
                </SongListWrapper>
            </Container>
        </CSSTransition>
    )
}

const mapStateToProps = state => ({
    artist: state.getIn(['singerInfo', 'artist']),
    songs: state.getIn(['singerInfo', 'songsOfArtist']),
    loading: state.getIn(['singerInfo', 'loading'])
});

const mapDispatchToProps = dispatch => ({
    getSingerInfoDispatch(id) {
        dispatch(getSingerInfo(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));