function createForceGraph() {
    let w = 300;
    let h = 200;
    
    let dataset = {
        nodes: [
            {name: "a"},
            {name: "b"},
            {name: "c"},
            {name: "d"},
            {name: "e"},
            {name: "f"},
            {name: "g"},
            {name: "h"},
            {name: "i"},
            {name: "j"},
        ],
        edges: [
            {source: 0, target: 1},
            {source: 1, target: 2},
            {source: 2, target: 3},
            {source: 3, target: 4},
            {source: 4, target: 5},
            {source: 5, target: 6},
            {source: 6, target: 7},
            {source: 7, target: 8},
            {source: 8, target: 9},
            {source: 0, target: 5},
            {source: 5, target: 8},
            {source: 7, target: 3},
            {source: 4, target: 3},
            {source: 2, target: 5},
        ]
    };
    
    let svg = d3
        .select("#forceGraph")
        .attr("width", w)
        .attr("height", h);
    
    let force = d3.forceSimulation(dataset.nodes)
        .force("charge", d3.forceManyBody())
        .force("link", d3.forceLink(dataset.edges))
        .force("center", d3.forceCenter().x(w/2).y(h/2));
    
    let colors = d3.scaleOrdinal(d3.schemePastel1);
    
    let edges = svg.selectAll("line")
        .data(dataset.edges)
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", 1);
    
    let nodes = svg.selectAll("circle")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .style("fill", function(d, i) {
            return colors(i);
        });
    
    force.on("tick", function() {
        edges.attr("x1", function(d) { return d.source.x; })
             .attr("y1", function(d) { return d.source.y; })
             .attr("x2", function(d) { return d.target.x; })
             .attr("y2", function(d) { return d.target.y; });

        nodes.attr("cx", function(d) { return d.x; })
             .attr("cy", function(d) { return d.y; });

    });
}

window.onload = function() {
  // do d3 stuff here...
    createForceGraph();
}
