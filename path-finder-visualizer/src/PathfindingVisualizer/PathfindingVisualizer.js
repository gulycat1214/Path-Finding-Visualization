import React, { useEffect, useState } from 'react';
import Node from './Node';
import './PathfindingVisualizer.css';
import NavigationBar from './NavigationBar';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithms/Dijkstra';

export default function PathfindingVisualizer(){

    const BOARD_WIDTH = 85;
    const BOARD_LENGTH = 30;
    const INITIAL_POS_x = 0;
    const INITIAL_POS_y = 0;
    const FINAL_POS_x = 25;
    const FINAL_POS_y = 70;

    const [nodes, setNodes] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    const handleMouseEnter = (row, col) => {
        if(!mouseIsPressed) return;
        const newGrid = addOrDeleteWall(nodes, row, col);
        setNodes(newGrid);   
    }
    
    const handleMouseDown = (row, col) => {
        const newGrid = addOrDeleteWall(nodes, row, col)
        setMouseIsPressed(true);
        setNodes(newGrid);
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    }

    const animatedDijkstra = (visitedNodes, shortestPath) => {
        for(let i = 1; i <= visitedNodes.length; i++) {
            if ( i === visitedNodes.length) {
                setTimeout(() => {
                    showPath(shortestPath);
                }, 2*i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                if(node.col !== FINAL_POS_y || node.row !== FINAL_POS_x) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-is-visited';   
                }
            }, i)
        }
    }

    const computeDijkstra = () => {
        const visitedNodes = dijkstra(nodes, nodes[INITIAL_POS_x][INITIAL_POS_y], nodes[FINAL_POS_x][FINAL_POS_y]);
        console.log(visitedNodes);
        const shortestPath = getNodesInShortestPathOrder(nodes[FINAL_POS_x][FINAL_POS_y]);
        animatedDijkstra(visitedNodes, shortestPath);
    }

    const showPath = (nodes) => {
        if(nodes.length === 1) {
            alert('No path')
            return;
        }
        for(let i = 0; i < nodes.length; i++) {
            if( (nodes[i].row === INITIAL_POS_x && nodes[i].col === INITIAL_POS_y) 
                || (nodes[i].row === FINAL_POS_x && nodes[i].col === FINAL_POS_y)) continue;
            setTimeout(function() {
                document.getElementById(`node-${nodes[i].row}-${nodes[i].col}`).className = 'node node-is-path';
            }, 10);
        }
    }


    useEffect(() => {
        let nodes = [];
        for( let row = 0; row < BOARD_LENGTH; row++) {
            const currentRow = [];
            for( let col = 0; col < BOARD_WIDTH; col++) {
                let currentNode = {
                    row,
                    col,
                    isStart: row === INITIAL_POS_x && col === INITIAL_POS_y,
                    isFinish: row === FINAL_POS_x && col === FINAL_POS_y,
                    isWall: false,
                    isVisited: false,
                    distance: (row === INITIAL_POS_x && col === INITIAL_POS_y) ? 0 : Infinity,
                    previousNode: null
                }
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        setNodes(nodes);
    }, []);

    return(
        <>
        <NavigationBar></NavigationBar>
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
                                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                    onMouseUp={() => handleMouseUp()}
                                ></Node>
                            )
                        })}
                    </div>
                )
            })}
        </div>
        <div className="button">
            <button
                onClick={() => computeDijkstra()}
                type="button"
            >Dijkstra</button>
            <button
                type="button"
            >Clear</button>
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