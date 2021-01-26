import React, { Component, useEffect, useState } from 'react';
import Node from './Node';
import './PathfindingVisualizer.css';
export default function PathfindingVisualizer(){

    const [nodes, setNodes] = useState([]);

    const handleMouseEnter = (row, col) => {
        const newGrid = addOrDeleteWall(nodes, row, col);
        setNodes(newGrid);
    }

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
                    isWall: false,
                    isVisited: false,
                    distance: (row === 0 && col === 0) ? 0 : Infinity,
                    previousNode: null
                }
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        setNodes(nodes);
        console.log(nodes);
    }, []);

    return(
        <>
        <div className="grid">
            {nodes.map((row, rowIndex) => {
                return(
                    <div>
                        {row.map((node, nodeIndex) => {
                            const {row, col, isStart, isFinish, isWall} = node;
                            return(
                                <Node
                                    row={row}
                                    col={col}
                                    key={nodeIndex}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                    isWall={isWall}
                                    addWall={(row, col) => handleMouseEnter(row, col)}
                                ></Node>
                            )
                        })}
                    </div>
                )
            })}
        </div>
        <div className="button">
            <button
                type="button"
            >Dijkstra</button>
        </div>
        </>
    );
}

const addOrDeleteWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
}