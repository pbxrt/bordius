import React from 'react';
import {connect} from 'react-redux';
import {SongList, SongItem} from './style';
import {getName} from '../../api/utils';
import {
    changePlayList,
    changeCurrentIndex,
    changeSequencePlayList
} from '../../application/Player/store/actionCreators';

const SongsList = React.forwardRef((props, refs) => {
    const { collectCount, showCollect, songs } = props;
    const totalCount = songs.length;
    const {
        changePlayListDispatch,
        changeCurrentIndexDispatch,
        changeSequencePlayListDispatch
    } = props;

    const selectItem = (e, index) => {
        changePlayListDispatch(songs);
        changeSequencePlayListDispatch(songs);
        changeCurrentIndexDispatch(index);
        const rect = e.target.getBoundingClientRect();
        const {pageX: x, pageY: y} = e;
        setTimeout(() => {
            createMusicNote(rect, x, y);
        }, 20);
    }

    const createMusicNote = (rect, x, y) => {
        const height = window.innerHeight;
        const followHeight = height - rect.bottom - 30;
        const container = document.createElement('div');
        Object.assign(container.style, {
            position: 'fixed',
            top: y + 'px',
            left: x + 'px',
            transition: 'left 1s linear',
            zIndex: 100000
        });
        const note = document.createElement('div');
        note.classList.add('iconfont');
        note.innerHTML = '&#xe642;';
        Object.assign(note.style, {
            position: 'absolute',
            width: '20px',
            height: '20px',
            borderRadius: '10px',
            fontSize: '16px',
            opacity: 1,
            left: '-10px',
            top: '-10px',
            color: 'red',
            transition: 'top 1s cubic-bezier(.41,-0.17,.83,.67)'
        });
        container.appendChild(note);
        document.body.appendChild(container);
        setTimeout(() => {
            container.style.left = '30px';
            Object.assign(note.style, {
                top: `${followHeight}px`,
                opacity: '0.4'
            })
            setTimeout(() => {
                document.body.removeChild(container);
            }, 1100);
        }, 300);
    }

    const songList = list => {
        let res = [];
        for (let i=0; i<list.length; i++) {
            let item = list[i];
            res.push(
                <li key={item.id} onClick={e => selectItem(e, i)}>
                    <span className="index">{i + 1}</span>
                    <div className="info">
                        <span>{item.name}</span>
                        <span>
                            { item.ar ? getName (item.ar): getName (item.artists) } - { item.al ? item.al.name : item.album.name}
                        </span>
                    </div>
                </li>
            )
        }
        return res;
    }

    const collect = count => (
        <div className="add_list">
            <i className="iconfont">&#xe62d;</i>
            <span>收藏 ({Math.floor (count/1000)/10} 万)</span>
        </div>
    );

    return (
        <SongList ref={refs} showBackground={props.showBackground}>
            <div className="first_line">
                <div className="play_all" onClick={(e) => selectItem (e, 0)}>
                    <i className="iconfont">&#xe6e3;</i>
                    <span> 播放全部 <span className="sum">(共 {totalCount} 首)</span></span>
                </div>
                { showCollect ? collect (collectCount) : null}
            </div>
            <SongItem>
                { songList(songs) }
            </SongItem>
        </SongList>
    );
})

const mapDispatchToProps = dispatch => ({
    changePlayListDispatch(data) {
        dispatch(changePlayList(data));
    },
    changeCurrentIndexDispatch(index) {
        dispatch(changeCurrentIndex(index));
    },
    changeSequencePlayListDispatch(data) {
        dispatch(changeSequencePlayList(data));
    }
})

export default connect(null, mapDispatchToProps)(React.memo(SongsList));