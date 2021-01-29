import React, { useEffect, useState } from 'react';
import Node from './Node';
import './PathfindingVisualizer.css';
import NavigationBar from './NavigationBar';
import {
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithms/Dijkstra';
import {bfs} from '../Algorithms/Bfs';
import HelpDialog from './HelpDialog';
import AlgorithmSelector from './AlgorithmSelector';

const useStyles = makeStyles({
    button1: {
        margin: '20px',
        backgroundColor: 'red',
        fontWeight: 'bold'
    },
    button2: {
        margin: '20px',
        backgroundColor: 'green',
        fontWeight: 'bold'
    },
    button3: {
        margin: '20px',
        backgroundColor: 'purple',
        fontWeight: 'bold'
    },
    button4: {
        margin: '20px',
        backgroundColor: 'yellow',
        fontWeight: 'bold'
    },
    button5: {
        margin: '20px',
        backgroundColor: 'brown',
        fontWeight: 'bold'
    },
})

export default function PathfindingVisualizer(){

    const classes = useStyles();

    // board characteristics
    const BOARD_WIDTH = 55;
    const BOARD_LENGTH= 23;
    const INITIAL_POS_x = 7;
    const INITIAL_POS_y = 8;
    const FINAL_POS_x = 9;
    const FINAL_POS_y = 36;

    const [algorithm, setAlgorithm] = useState('Dijkstra');

    //grid is a 2D array [][]
    const [grid, setGrid] = useState([]);
    //variable to control if mouse is pressed (add walls or move initial points)
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    //when mouse scrolls over
    const handleMouseEnter = (row, col) => {
        if(!mouseIsPressed) return;
        const newGrid = addOrDeleteWall(grid, row, col);
        setGrid(newGrid);             
    }
    //when mouse presses a "node" aka <div>
    const handleMouseDown = (row, col) => {
        setMouseIsPressed(true);
        const newGrid = addOrDeleteWall(grid, row, col);
        setGrid(newGrid);            
    }
    //when mouse is unpressed
    const handleMouseUp = (row, col) => {
        setMouseIsPressed(false);
    }
    //visual animation for computing Dijkstra's algorithm
    const animatedVisualization = (visitedNodes, shortestPath) => {
        for(let i = 1; i <= visitedNodes.length; i++) {
            if ( i === visitedNodes.length) {
                setTimeout(() => {
                    showPath(shortestPath);
                }, i);
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
    //compute actual dijkstra algorithm
    const computeDijkstra = () => {
        const visitedNodes = dijkstra(grid, grid[INITIAL_POS_x][INITIAL_POS_y], grid[FINAL_POS_x][FINAL_POS_y]);
        const shortestPath = getNodesInShortestPathOrder(grid[FINAL_POS_x][FINAL_POS_y]);
        animatedVisualization(visitedNodes, shortestPath);
    }

    const computeBfs = () => {
        const visitedNodes = bfs(grid, grid[INITIAL_POS_x][INITIAL_POS_y], grid[FINAL_POS_x][FINAL_POS_y]);
        const shortestPath = getNodesInShortestPathOrder(grid[FINAL_POS_x][FINAL_POS_y]);
        animatedVisualization(visitedNodes, shortestPath);
    }

    const visualizeAlgorithm = () => {
        if(algorithm === 'Dijkstra') {
            computeDijkstra();
        } else if(algorithm === 'BFS (Breadth-first search)') {
            computeBfs();
        } else {
            alert('Not implemented yet');
        }
    }

    const changeAlgorithm = (algorithm) => {
        setAlgorithm(algorithm);
    }

    //show shortest path
    const showPath = (nodes) => {
        if(nodes.length === 1) {
            alert('No path')
            return;
        }
        for(let i = 0; i < nodes.length; i++) {
            if( nodeIsInitialOrLast(nodes[i].row, nodes[i].col) ) continue;
            setTimeout(function() {
                document.getElementById(`node-${nodes[i].row}-${nodes[i].col}`).className = 'node node-is-path';
            }, 10);
        }
    }
    //Helper method to detect if node is initial or last
    const nodeIsInitialOrLast = (row, col) => {
        if( (row === INITIAL_POS_x && col === INITIAL_POS_y) 
        || (row === FINAL_POS_x && col === FINAL_POS_y)) {
            return true;
        }
        return false;
    }
    //clear grid (board)
    const clearGrid = () => {
        setGrid(createEmptyGrid());
        for( let row = 0; row < BOARD_LENGTH; row++) {
            for( let col = 0; col < BOARD_WIDTH; col++) {
                if(nodeIsInitialOrLast(row, col)) continue;
                document.getElementById(`node-${row}-${col}`).className = 'node'; 
            }
        }
    }
    //initialize grid
    const createEmptyGrid = () => {
        let grid = [];
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
            grid.push(currentRow);
        }
        return grid;       
    }
    //method to add or delete walls when clicking the grid
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
    

    useEffect(() => {
        setGrid(createEmptyGrid());
    }, []);

    return(
        <>
        <NavigationBar></NavigationBar>
        <div className="buttons-container">
            <AlgorithmSelector
                changeAlgorithm={changeAlgorithm}
                currentAlgorithm={algorithm}
            ></AlgorithmSelector>
            <Button variant="contained" className={classes.button2} onClick={() => visualizeAlgorithm()}>VISUALIZE</Button>
            <Button variant="contained" className={classes.button4} onClick={() => clearGrid()}>CLEAR GRID</Button>
            <HelpDialog></HelpDialog>
        </div>
        <div className="grid">
            {grid.map((row, rowIndex) => {
                return(
                    <div key={rowIndex}>
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
                                    onMouseUp={(row, col) => handleMouseUp(row, col)}
                                ></Node>
                            )
                        })}
                    </div>
                )
            })}
        </div>
        </>
    );
}
