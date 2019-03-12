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

function createTreeMap() {
    let root = d3.hierarchy(dataset).count();
    console.log(root)
    
    let w = 600, h = 500;
    
    let svg = d3.select("#treeMap")
        .attr('width', w)
        .attr('height', h);
    
    let treelayout = d3.treemap()
        .size([w, h])
        .paddingOuter(10)
        .paddingInner(10)
        .paddingTop(35)
        .round(true)
        .tile(d3.treemapSliceDice);
    
    treelayout(root);
    
    console.log(root);
    
    let color = d3.scaleOrdinal(d3.schemePastel2);
    
    // create rectangles 
    svg.selectAll('rect')
        .data(root.descendants())
        .enter()
        .append('rect')
        .style('fill', d => color(d.depth))
        .attr('x', d => d.x0 )
        .attr('y', d => d.y0 )
        .attr('width', d => (d.x1 - d.x0) )
        .attr('height', d => (d.y1 - d.y0));
}

window.onload = function() {
  createTreeMap();
}
