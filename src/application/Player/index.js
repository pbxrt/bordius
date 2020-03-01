import React, {useRef, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import {getSongUrl, isEmptyObject} from '../../api/utils';
import {
    changePlayingState,
    changeShowPlayList,
    changeCurrentIndex,
    changeCurrentSong,
    changePlayList,
    changePlayMode,
    changeFullScreen
} from './store';

function Player(props) {
    const {fullScreen, playing, currentIndex, currentSong: immutableCurrentSong} = props;
    const {toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch, changeCurrentDispatch} = props;

    let currentSong = immutableCurrentSong.toJS();
    // 目前播放时间
    const [currentTime, setCurrentTime] = useState(0);

    // 歌曲总时长
    const [duration, setDuration] = useState(0);

    // 歌曲播放进度
    let percent = (currentTime / duration) || 0;

    const audioRef = useRef();

    const playList = [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: '01',
      crbt: null,
      no: 1,
      st: 0,
      rt: '',
      cf: '',
      alia: [
        '手游《梦幻花园》苏州园林版推广曲'
      ],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: '拾梦纪',
        picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
        tns: [],
        pic_str: '109951164627180052',
        pic: 109951164627180050
      },
      name: '拾梦纪',
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: '妖扬',
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: '金天',
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null
    }
];

    useEffect(() => {
        if (!currentSong) return;
        changeCurrentIndexDispatch(0);
        let current = playList[0];
        changeCurrentDispatch(current);
        audioRef.current.src = getSongUrl(current.id);
        setTimeout(() => {
            audioRef.current.play();
        })
        console.log(audioRef.current.src);
        togglePlayingDispatch(true);
        setCurrentTime(0);
        setDuration((current.dt / 1000) | 0);
    }, []);

    return (
        <div className="players-container">
            {
                !isEmptyObject(currentSong) && (
                    <>
                        <MiniPlayer
                            song={currentSong}
                            fullScreen={fullScreen}
                            toggleFullScreen={toggleFullScreenDispatch}
                            playing={playing}
                            clickPlaying={togglePlayingDispatch}
                        />
                        <NormalPlayer
                            song={currentSong}
                            fullScreen={fullScreen}
                            toggleFullScreen={toggleFullScreenDispatch}  
                        />
                    </>
                )
            }
            <audio ref={audioRef}></audio>
        </div>
    );
}

const mapStateToProps = state =>({
    fullScreen: state.getIn(['player', 'fullScreen']),
    playing: state.getIn(["player", "playing"]),
    currentSong: state.getIn(["player", "currentSong"]),
    showPlayList: state.getIn(["player", "showPlayList"]),
    mode: state.getIn(["player", "mode"]),
    currentIndex: state.getIn(["player", "currentIndex"]),
    playList: state.getIn(["player", "playList"]),
    sequencePlayList: state.getIn(["player", "sequencePlayList"])
});

const mapDispatchToProps = dispatch =>({
    togglePlayingDispatch(data) {
        dispatch(changePlayingState(data));
    },
    toggleFullScreenDispatch(data) {
        dispatch(changeFullScreen(data));
    },
    togglePlayListDispatch(data) {
        dispatch(changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index) {
        dispatch(changeCurrentIndex(index));
    },
    changeCurrentDispatch(data) {
        dispatch(changeCurrentSong(data));
    },
    changeModeDispatch(data) {
        dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data) {
        dispatch(changePlayList(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));