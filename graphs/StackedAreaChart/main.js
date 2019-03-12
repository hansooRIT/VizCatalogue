let dataset;

let parseDate = d3.timeParse("%m-%d-%Y");

let key = d => d.date;

function rowConverter(d) {
    console.log(parseDate(d.date));
    return {
        date: parseDate(d.date),
        chocolate: parseInt(d.chocolate),
        vanilla: parseInt(d.vanilla),
        strawberry: parseInt(d.strawberry),
        cookiesandcream: parseInt(d.cookiesandcream),
        mint: parseInt(d.mint),
    };
}

function createStackedAreaChart() {
    let w = 615;
    let h = 525;
    
    let svg = d3
        .select("#stackedAreaChart")
        .attr("width", w)
        .attr("height", h);
    
    let stack = d3.stack().order(d3.stackOrderDescending);
    
    let keys = dataset.columns;
    keys.shift();
    stack.keys(keys);
    
    let series = stack(dataset);
    
    console.log(series);
    
    let yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, (d) => {
            let sum = 0;
            for (var i = 0; i < keys.length; i++) {
                sum += d[keys[i]];
            };
            return sum;
        })])
        .range([h - 20, 20]);
                                
    let xScale = d3.scaleTime()
        .domain([d3.min(dataset, function(d) {
            return d.date; 
        }), d3.max(dataset, function(d) {
            return d.date;
        })])
        .range([40, w - 20]);
    
    let colors = ["#477cf7", "#6387f8", "#8c9ff9", "#b6bdf9", "#d3d5fa"];
    
    let area = d3.area()
        .x(function(d) {
            console.log(d);
            return xScale(d.data.date);
        })
        .y0(function(d) {
            return yScale(d[0]);
        })
        .y1(function(d) {
            return yScale(d[1]);
        });
    
    let areaGraph = svg.selectAll("path")
        .data(series)
        .enter()
        .append("path")
        .attr("class", "stackedArea")
        .attr("d", area)
        .attr("fill", (d, i) => {
            return colors[i];
        })
        .attr("transform", `translate(10, -10)`);

    let xAxis = d3
        .axisBottom(xScale)
        .ticks(dataset.length)
        .tickFormat(d3.timeFormat("%m/%d"));

    let xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(10, ${h - 30})`)
        .call(xAxis);
    
    let yAxis = d3.axisLeft(yScale);

    let yAxisGroup = svg
        .append("g")
        .attr("transform", `translate(50, -10)`)
        .call(yAxis);
    
    svg.append("text")             
      .attr("transform",
            "translate(330, 520)")
      .style("text-anchor", "middle")
      .text("Date");
    
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -5)
      .attr("x", -250)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Ice Cream Sales");  
}

window.onload = function() {
  d3.csv("icecreamData.csv", rowConverter).then(data => {
      data.sort((a, b) => a.date - b.date);
      dataset = data;
      createStackedAreaChart();
  })
}
