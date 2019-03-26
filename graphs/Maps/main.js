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
        .attr('r', 3)
        .on("mouseover", function(d) {
            d3.select("#name")
                .text("City: " + d.name);
            d3.select("#lat")
                .text("Latitude: " + d.lat);
            d3.select("#long")
                .text("Longitude: " + d.lon);
            d3.select("#tooltip")
                .style("left", 800 + "px")
                .style("top", 0 + "px")
                .classed("hidden", false);
        })
        .on("mouseout", function(d) {
            d3.select("#tooltip")
                .classed("hidden", true);
        });
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
