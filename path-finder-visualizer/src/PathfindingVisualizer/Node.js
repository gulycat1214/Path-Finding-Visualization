import React, {useState} from 'react';
import './Node.css';
export default function Node (props) {

    const {row, col, isFinish, isStart, isWall, addWall} = props;
    const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-is-wall' : '';

    return(
        <div 
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onClick={() => {
                addWall(row, col);
            }}
        >
        </div>
    );
}