export function bfs(grid, startNode, finishNode) {
    const unvisitedNodes = getAllNodes(grid);
    const visitedNodes = [];
    while(unvisitedNodes.length !== 0) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if(closestNode.isWall) continue;
        if(closestNode.distance === Infinity) return visitedNodes;
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
        if(closestNode === finishNode) return visitedNodes;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisistedNodes) {
    unvisistedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisistedNodes = getNeighbors(node, grid);
    for(const neighbor of unvisistedNodes) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if(row > 0) neighbors.push(grid[row-1][col]);
    if(row < grid.length - 1) neighbors.push(grid[row+1][col]);
    if(col > 0) neighbors.push(grid[row][col-1]);
    if(col < grid[0].length - 1) neighbors.push(grid[row][col+1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for(const row of grid) {
        for(const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}