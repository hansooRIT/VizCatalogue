function createMap(dataset, cityValues) {
    let w = 800, h = 600;
    let svg = d3.select("#map")
              .attr('width', w)
              .attr('height', h);
    
    let projection = d3.geoAlbersUsa()
								   .translate([w/2, h/2]) ;

    let path = d3.geoPath()
            .projection(projection);
    
    let map = svg.append('g');
    
    map.selectAll("path")
        .data(dataset.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "black")
        .style("fill", "#66a0ff");
    
    map.selectAll("circle")
        .data(cityValues.cities)
        .enter()
        .append("circle")
        .style('fill', 'red')
        .style('stroke', 'black')
        .attr('cx', d => projection([d.lon, d.lat])[0])
        .attr('cy', d => projection([d.lon, d.lat])[1])
        .attr('r', 3);
}

Promise.all([
    d3.json('us-states.json'),
    d3.json('city-data.json')
  ]).then((values) => {
    let [stateData, cityData] = values;

    console.log(stateData);
    console.log(cityData);
    
    createMap(stateData, cityData);

  }); 
