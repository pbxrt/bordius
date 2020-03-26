import React, {useState, useRef, useEffect, useCallback} from 'react';
import {CSSTransition} from 'react-transition-group';
import {
    Container,
    ImgWrapper,
    SongListContainer,
    CollectButton,
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
    const imageWrapper = useRef();
    const collectBtn = useRef();
    // picture initial height
    const initialHeight = useRef(0);

    useEffect(() => {
        let h = imageWrapper.current.offsetHeight;
        initialHeight.current = h;
    }, []);

    useEffect(() => {
        getSingerInfoDispatch(props.match.params.id);
        // eslint-disable-next-line
    }, []);

    const handleScroll = pos => {
        let height = initialHeight.current;
        const percent = Math.abs(pos.y / height);
        if (pos.y <= 0) {
            const collectBtnDOM = collectBtn.current;
            collectBtnDOM.style.opacity = 1 - 2 * percent;
        } else {
            const imageDOM = imageWrapper.current;
            imageDOM.style.transform = `scale(${1 + percent})`;
        }
    }

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => props.history.goBack()}
        >
            <Container play={false}>
                <Loading show={loading} />
                <Header
                    title={artist.name}
                    handleClick={() => setShowStatus(false)}
                ></Header>
                <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
                    <div className="filter"></div>
                </ImgWrapper>
                <SongListContainer>
                    <Scroll onScroll={handleScroll}>
                        <SongsList marginTop={true} songs={songs} showCollect={false}>
                            <CollectButton ref={collectBtn}>
                                <i className="iconfont">&#xe62d;</i>
                                <span className="text">收藏</span>
                            </CollectButton>
                        </SongsList>
                    </Scroll>
                </SongListContainer>
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