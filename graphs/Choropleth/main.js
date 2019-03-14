function createChoropleth(dataset, statePopData) {
    let w = 900, h = 600;
    let svg = d3.select("#choropleth")
              .attr('width', w)
              .attr('height', h);
    
    let projection = d3.geoAlbersUsa()
								   .translate([400, h/2]) ;

    let projectionDefaultScale = projection.scale();
    
    let path = d3.geoPath()
            .projection(projection);
    
    let colors = ["#E3EEF1","#CCDDE3","#B3CCD5","#00BCC7","#80ABB9","#679AAB","#4D8A9D","#34798F","#1B6881","#025874"];
    
    let colorScale = d3.scaleQuantize()
        .range(colors);
    
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
            return colorScale(value);
    });
    
    let legendScale = d3.scaleOrdinal()
          .domain(["0.0-1.25%", "1.25-2.5%", "2.5-3.75%", "3.75-5.0%", "5.0-6.25%", "6.25-7.5%", "7.5-8.75%", "8.75-10.0%", "10.0-11.25%", "11.25-12.5"])
          .range(colors);

    svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(800,20)");

    // see https://github.com/d3/d3-shape#symbols for information about d3 symbol shapes
    var legendOrdinal = d3.legendColor()
        .shape("path", d3.symbol().type(d3.symbolSquare).size(60)())
        .shapePadding(10)
        .scale(legendScale);

    svg.select(".legendOrdinal")
        .call(legendOrdinal);
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
    
    createChoropleth(stateMapData, statePopValues);

  }); 