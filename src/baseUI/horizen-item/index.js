import React, { useState, useRef, useEffect, memo } from 'react';
import Scroll from '../scroll/index'
import { PropTypes } from 'prop-types';
import {List, ListItem} from './style';

function Horizen(props) {
    const {list, oldVal, title} = props;
    const {handleClick} = props;
    return (
        <Scroll direction="horizental">
                <List>
                    <span>{title}</span>
                    {
                        list.map(item => (
                            <ListItem
                                key={item.key}
                                className={`${oldVal === item.key ? 'selected' : ''}`}
                                onClick={() => handleClick(item.key)}>
                                {item.name}
                            </ListItem>
                        ))
                    }
                </List>

        </Scroll>
    )
}

// think the props received
// list is the data
// oldVal is the current data
// title is the left title
// handleClick is the event handler

Horizen.defaultProps = {
    list: [],
    oldVal: '',
    title: '',
    handleClick: null
};

Horizen.propTypes = {
    list: PropTypes.array,
    oldVal: PropTypes.string,
    title: PropTypes.string,
    handleClick: PropTypes.func
};

export default Horizen;