// Implementation of DIJKSTRA's ALGORITHM
// Functionality:
// - Set all nodes with distance Infinity to initial node
// - Sort all nodes by distance to initial node and
//      get the nearest node
// - Mark this node as visited, increment distance to origin
// - Get neighbor nodes and sort again
// - When arriving to final Node, backtrack to find shortest path.


export function dijkstra(grid, startNode, finishNode) {
    const unvisistedNodes = getAllNodes(grid);
    const visitedNodes = [];
    while(unvisistedNodes.length != 0) {
        // get nearest node
        sortNodesByDistance(unvisistedNodes);
        const closestNode = unvisistedNodes.shift();
        if(closestNode.isWall) continue;
        if(closestNode.distance === Infinity) return visitedNodes;
        // mark as visited
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
        if(closestNode === finishNode) return visitedNodes;
        // update distances + 1
        updateUnvisistedNodes(closestNode, grid);
    }
}
// sort array of nodes by distance to origin
function sortNodesByDistance(unvisistedNodes) {
    unvisistedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
// update nodes
function updateUnvisistedNodes(node, grid) {
    const unvisitedNodes = getUnvisitedNeighbors(node, grid);
    for(const neighbor of unvisitedNodes) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}
// update neighbor nodes
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if(row > 0) neighbors.push(grid[row-1][col]);
    if(row < grid.length - 1) neighbors.push(grid[row+1][col]);
    if(col > 0) neighbors.push(grid[row][col-1]);
    if(col < grid[0].length - 1) neighbors.push(grid[row][col+1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}
// iterate grid
function getAllNodes(grid) {
    const nodes = [];
    for(const row of grid) {
        for(const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}
// backtrack from final node
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPath = [];
    let currentNode = finishNode;
    while(currentNode != null) {
        nodesInShortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPath;
}










