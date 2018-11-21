function createChoropleth(dataset, statePopData) {
    let w = 800, h = 600;
    let svg = d3.select("#choropleth")
              .attr('width', w)
              .attr('height', h);
    
    let projection = d3.geoAlbersUsa()
								   .translate([w/2, h/2]) ;

    let projectionDefaultScale = projection.scale();
    
    let path = d3.geoPath()
            .projection(projection);
    
    let colorScale = d3.scaleQuantize()
        .range(["#E3EEF1","#CCDDE3","#B3CCD5","#00BCC7","#80ABB9","#679AAB","#4D8A9D","#34798F","#1B6881","#025874"]);
    
    let sValues = Array.from(statePopData.values()); 
    colorScale.domain(d3.extent(sValues));
    
    svg.selectAll("path")
        .data(dataset.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "black")
        .style("fill", (d) => {
            let value = statePopData.get(d.properties.name);
            console.log(value);
            console.log(colorScale(value));
            return colorScale(value);
    });
}

Promise.all([
    d3.json('us-states.json'),
    d3.json('state-values.json')
  ]).then((values) => {
    let [stateMapData, statePopData] = values;

    let states = statePopData.map(d => {
        return {
            state: d.name,
            value: d.value,
        }
    });
    
    let statePopValues = new Map(states.map(d => [d.state, d.value]));
    
    console.log(statePopValues);
    
    createChoropleth(stateMapData, statePopValues);

  }); 