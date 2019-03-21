let dataset = {
    "name": "VizCatalogue",
    "children": [
        { "name": "Bar Charts",
         "children": [{
             "name": "Stacked Bar Chart",
         }]
        },
        { "name": "Line Charts",
         "children": [{
             "name": "Area Chart",
             "children": [{
                 "name": "Stacked Area Chart",
             }]
         }]
        },
        { "name": "Arc Charts",
         "children": [{
             "name": "Pie Chart",
         },
         {
             "name": "Donut Chart",
         }]
        },
        { "name": "Hierarchical Charts",
         "children": [{
             "name": "Tree",
         },
         {
             "name": "Partition",
         },
         {
             "name": "Treemap",
         },
         {
             "name": "Cluster",
         },
         {
             "name": "Packed Circles",
         },
         {
             "name": "Chord",
         }]
        },
        { "name": "Scatterplot"
        },
        { "name": "Geomapping",
        "children": [{
            "name": "Maps"
        },
        {
            "name": "Choropleth"
        },
        {
            "name": "Candlestick"
        }]}
    ]
};

function createCluster() {
    let root = d3.hierarchy(dataset);
    
    let w = 500, h = 500;
    
    let svg = d3.select("#cluster")
        .attr('width', w)
        .attr('height', h);
    
    let treelayout = d3.cluster().size([w - 40, h - 40]);
    
    treelayout(root);
    
    svg.selectAll('lines')
        .data(root.links())
        .enter()
        .append('line')
        .classed('link', true)
        .attr('x1', d => d.source.y + 20)
        .attr('y1', d => d.source.x + 20)
        .attr('x2', d => d.target.y + 20)
        .attr('y2', d => d.target.x + 20);
    
    svg.selectAll('circle')
        .data(root.descendants())
        .enter()
        .append('circle')
        .classed('node', true)
        .attr('cx', d => d.y + 20)
        .attr('cy', d => d.x + 20)
        .attr('r', 10)
        .on("mouseover", function(d) {
            d3.select("#name")
                .text("Graph type: " + d.data.name);
            d3.select("#depth")
                .text("Depth: " + d.depth);
            d3.select("#height")
                .text("Height: " + d.height);
            d3.select("#tooltip")
                .style("left", d.y + 200 + "px")
                .style("top", d.x + 30 + "px")
                .classed("hidden", false);
        })
        .on("mouseout", function(d) {
            d3.select("#tooltip")
                .classed("hidden", true);
        });
}

window.onload = function() {
    createCluster();
  // do d3 stuff here...
}
