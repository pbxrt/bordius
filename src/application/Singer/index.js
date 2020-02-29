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
import SongsList from '../SongList';
import Scroll from '../../baseUI/scroll';

function Singer(props) {
    const [showStatus, setShowStatus] = useState(true);
    const collectButton = useRef();
    const imageWrapper = useRef();
    const songScrollWrapper = useRef();
    const songScroll = useRef();
    const header = useRef();
    const layer = useRef();
    // picture initial height
    const initialHeight = useRef(0);

    const offset = 5;

    useEffect(() => {
        let h = imageWrapper.current.offsetHeight;
        songScrollWrapper.current.style.top = `${h - offset}px`;
        initialHeight.current = h;
        layer.current.style.top = `${h - offset}px`;
        songScroll.current.refresh();
        // eslint-disable-next-line
    }, []);

    const setShowStatusFalse = useCallback(() => {
        setShowStatus(false);
    }, []);
    const artist = {
        picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
        name: "薛之谦",
        hotSongs: [
            { name: "我好像在哪见过你", ar: [{name: "薛之谦"}], al: { name: "薛之谦专辑" }, id: 1 },
            { name: "我好像在哪见过你", ar: [{name: "薛之谦"}], al: { name: "薛之谦专辑" }, id: 2 },
            { name: "我好像在哪见过你", ar: [{name: "薛之谦"}], al: { name: "薛之谦专辑" }, id: 3 },
            { name: "我好像在哪见过你", ar: [{name: "薛之谦"}], al: { name: "薛之谦专辑" }, id: 4 },
            { name: "我好像在哪见过你", ar: [{name: "薛之谦"}], al: { name: "薛之谦专辑" }, id: 5 },
            { name: "我好像在哪见过你", ar: [{name: "薛之谦"}], al: { name: "薛之谦专辑" }, id: 6 },
            { name: "我好像在哪见过你", ar: [{name: "薛之谦"}], al: { name: "薛之谦专辑" }, id: 7 },
            { name: "我好像在哪见过你", ar: [{name: "薛之谦"}], al: { name: "薛之谦专辑" }, id: 8 },
            { name: "我好像在哪见过你", ar: [{name: "薛之谦"}], al: { name: "薛之谦专辑" }, id: 9 },
            { name: "我好像在哪见过你", ar: [{name: "薛之谦"}], al: { name: "薛之谦专辑" }, id: 10 },
            { name: "我好像在哪见过你", ar: [{name: "薛之谦"}], al: { name: "薛之谦专辑" }, id: 11 },
            { name: "我好像在哪见过你", ar: [{name: "薛之谦"}], al: { name: "薛之谦专辑" }, id: 12 },
        ]
    };

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
                    <Scroll ref={songScroll}>
                        <SongsList songs={artist.hotSongs} showCollect={false}></SongsList>
                    </Scroll>
                </SongListWrapper>
            </Container>
        </CSSTransition>
    )
}

export default Singer;