import React, { Component, useEffect, useState } from 'react';
import Node from './Node';
import './PathfindingVisualizer.css';
export default function PathfindingVisualizer(){

    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        let nodes = [];
        for( let row = 0; row < 15; row++) {
            const currentRow = [];
            for( let col = 0; col < 50; col++) {
                let currentNode = {
                    row,
                    col,
                    isStart: row === 0 && col === 0,
                    isFinish: row === 14 && col === 49,
                    isWall: false
                }
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        setNodes(nodes);
        console.log(nodes);
    }, []);

    return(
        <div className="grid">
            {nodes.map((row, rowIndex) => {
                return(
                    <div>
                        {row.map((node, nodeIndex) => {
                            const {isStart, isFinish} = node;
                            return(
                                <Node
                                    key={nodeIndex}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                ></Node>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
}