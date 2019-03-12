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

function createPartition() {
    let root = d3.hierarchy(dataset).count();
    
    let w = 625, h = 625;
    
    let svg = d3.select("#partition")
        .attr('width', w)
        .attr('height', h);
    
    let partition = d3.partition()
        .size([w, h])
        .padding(1)
        .round(true);
    
    partition(root);
    
    svg.selectAll('rect')
        .data(root.descendants())
        .enter()
        .append('rect')
        .classed('partition-area', true)
        .attr('x', d => d.y0)
        .attr('y', d => d.x0)
        .attr('width', d => (d.y1 - d.y0))
        .attr('height', d => (d.x1 - d.x0));
    
    svg.selectAll('text')
     .data(root.descendants())
     .enter()
     .append('text')
     .classed('node-label', true)
     .style('font-weight', d => d.children ? 'bold' : 'normal')
     .attr('x', d => d.y0 + 10)
     .attr('y', d => d.x0 + 25)
     .text(d => d.data.name);

}

window.onload = function() {
    createPartition();
  // do d3 stuff here...
}
