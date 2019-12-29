import ForceGraph from 'force-graph';

const rootId = 0;
const N = 1000;
const gData = {
    nodes: [...Array(N).keys()].map(i => ({ id: i, collapsed: i !== rootId, childLinks: [] })),
    links: [...Array(N).keys()]
    .filter(id => id)
    .map(id => ({
        source: Math.round(Math.random() * (id - 1)),
        target: id
    }))
};
console.log(gData);
const elem = document.getElementById('id-test');
const Graph = ForceGraph()(elem)
    .graphData(gData)
    .onNodeHover(node => elem.style.cursor = node && node.childLinks.length ? 'pointer' : null)
    .onNodeClick(node => {
        if (node.childLinks.length) {
            node.collapsed = !node.collapsed; // toggle collapse state
            Graph.graphData(getPrunedTree());
        }
    })
    .nodeRelSize(20)
    .linkDirectionalParticles(1)
    .linkDirectionalParticleWidth(1)
    .nodeColor(node => !node.childLinks.length ? 'green' : node.collapsed ? 'red' : 'yellow');