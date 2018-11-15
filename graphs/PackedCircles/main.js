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

function createPack() {
    let root = d3.hierarchy(dataset).count();
    console.log(root)
    
    let color = d3.scaleOrdinal(d3.schemePastel1);
    
    let w = 500, h = 500;
    
    let svg = d3.select("#packedCircles")
        .attr('width', w)
        .attr('height', h);
    
    let partition = d3.pack()
        .size([w, h])
        .padding(1);
    
    partition(root);
    console.log(root);
    
    svg.selectAll('circle')
        .data(root.descendants())
        .enter()
        .append('circle')
        .style('fill', d => color(d.depth))
        .attr('cx', d => d.x )
        .attr('cy', d => d.y )
        .attr('r', d => d.r );
    
    svg.selectAll('text')
     .data(root.descendants())
     .enter()
     .append('text')
     .classed('node-label', true)
     .style('font-size', '8pt')
     .style('text-anchor', 'middle')
     .attr('x', d => d.x )
     .attr('y', d => d.y + 4)
     .text(d => d.data.name);

}

window.onload = function() {
    createPack();
  // do d3 stuff here...
}
