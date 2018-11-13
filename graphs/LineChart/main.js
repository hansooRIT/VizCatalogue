let dataset;

let parseDate = d3.timeParse("%Y-%m-%d");

let key = d => d.date;

function rowConverter(d) {
    return {
        calories: parseFloat(d.calories),
        date: parseDate(d.date)
    };
}

function createLineChart() {
    let w = 600;
    let h = 500;
    
    let svg = d3
        .select("#lineChart")
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
        .attr("transform", `translate(0, ${h - 20})`)
        .call(xAxis);
    
    let yAxis = d3.axisLeft(yScale);

    let yAxisGroup = svg
        .append("g")
        .attr("transform", `translate(40, 0)`)
        .call(yAxis);

    let line = d3
        .line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.calories));
    
    svg.append('path')
        .datum(dataset)
        .attr('class', 'line')
        .attr('d', line);
    
    svg.selectAll('.dot')
        .data(dataset, key)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.date))
        .attr("cy", d => yScale(d.calories))
        .attr('r', 5)
        .style("fill", "red");
}

window.onload = function() {
  d3.csv("calorieData.csv", rowConverter).then(data => {
      data.sort((a, b) => a.date - b.date);
      dataset = data;
      createLineChart();
  })
}
