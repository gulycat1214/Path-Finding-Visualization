import React, {useState} from 'react';
import './Node.css';
export default function Node (props) {

    const {isFinish, isStart,isWall} = props;
    const [extraClassName, setExtraClassName] = useState(isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-is-wall' : '');

    const addWall = () => {
        setExtraClassName('node-is-wall')
    }


    return(
        <div 
            className={`node ${extraClassName}`}
            onClick={() => {
               addWall();
            }}
        >
        </div>
    );
}