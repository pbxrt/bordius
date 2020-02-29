import React from 'react';
import {getName} from '../../../api/utils';
import {MiniPlayerContainer} from './style';

function MiniPlayer(props) {
    const {song} = props;
    return (
        <MiniPlayerContainer>
            <div className="poster" style={{background: `url(${song.al.picUrl}) no-repeat center center`}}>
            </div>
            <div className="text">
                <h2 className="name">{song.name}</h2>
                <p className="desc">{getName(song.ar)}</p>
            </div>
            <div className="control">
                <i className="iconfont">&#xe650;</i>
            </div>
            <div className="control">
                <i className="iconfont">&#xe640;</i>
            </div>
        </MiniPlayerContainer>
    );
}

export default MiniPlayer;