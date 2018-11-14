let dataset;

let parseDate = d3.timeParse("%Y-%m-%d");

let key = d => d.date;

function rowConverter(d) {
    return {
        fruit: parseInt(d.Fruit),
        meat: parseInt(d.Meat),
        grain: parseInt(d.Grain),
        vegetables: parseInt(d.Vegetables),
        dairy: parseInt(d.Dairy),
        sweets: parseInt(d.Sweets),
    };
}

function createAreaChart() {
    let w = 600;
    let h = 500;
    
    let svg = d3
        .select("#stackedBarChart")
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

    let area = d3
        .area()
        .x(d => xScale(d.date))
        .y(d => yScale(d.calories))
        .y1(yScale.range()[0]);
    
    svg.append('path')
        .datum(dataset)
        .attr('class', 'area')
        .attr('d', area);
}

window.onload = function() {
  d3.csv("dailyFoodData.csv", rowConverter).then(data => {
      data.sort((a, b) => a.date - b.date);
      dataset = data;
      createAreaChart();
  })
}
