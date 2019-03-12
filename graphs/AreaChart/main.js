let dataset;

let parseDate = d3.timeParse("%Y-%m-%d");

let key = d => d.date;

function rowConverter(d) {
    return {
        calories: parseFloat(d.calories),
        date: parseDate(d.date)
    };
}

function createAreaChart() {
    let w = 615;
    let h = 525;
    
    let svg = d3
        .select("#areaChart")
        .attr("width", w)
        .attr("height", h);
    
    let yScale = d3
        .scaleLinear()
        .domain([1500, 2600])
        .range([h - 20, 20]);
                                
    let xScale = d3
        .scaleTime()
        .domain([d3.min(dataset, d => d.date), parseDate("2018-11-10")])
        .range([40, w - 20]);
    
    let cScale = d3
        .scaleLinear()
        .domain([1500, 2600])
        .range(["red", "orange"]);
 
    let xAxis = d3
        .axisBottom(xScale)
        .ticks(dataset.length + 1)
        .tickFormat(d3.timeFormat("%a"));

    let xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(10, ${h - 30})`)
        .call(xAxis);
    
    let yAxis = d3.axisLeft(yScale);

    let yAxisGroup = svg
        .append("g")
        .attr("transform", `translate(50, 0)`)
        .call(yAxis);

    let area = d3
        .area()
        .x(d => xScale(d.date))
        .y(d => yScale(d.calories))
        .y1(yScale.range()[0]);
    
    svg.append('path')
        .datum(dataset)
        .attr('class', 'area')
        .attr("transform", `translate(10, -10)`)
        .attr('d', area);
    
    svg.append("text")             
      .attr("transform",
            "translate(310, 520)")
      .style("text-anchor", "middle")
      .text("Day");
    
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -5)
      .attr("x", -250)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Calories");      
}

window.onload = function() {
  d3.csv("calorieData.csv", rowConverter).then(data => {
      data.sort((a, b) => a.date - b.date);
      dataset = data;
      createAreaChart();
  })
}
