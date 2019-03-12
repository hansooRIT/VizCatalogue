let dataset;

let parseDate = d3.timeParse("%Y-%m-%d");

let key = d => d.date;

function rowConverter(d) {
    return {
        date: parseDate(d.date),
        high: parseInt(d.high),
        close: parseInt(d.close),
        open: parseInt(d.open),
        low: parseInt(d.low),
    };
}

function createCandlestickChart() {
    let w = 615;
    let h = 525;
    
    let svg = d3
        .select("#candlestick")
        .attr("width", w)
        .attr("height", h);
    
    let yScale = d3
        .scaleLinear()
        .domain([25, 250])
        .range([h - 20, 20]);
                                
    let xScale = d3
        .scaleTime()
        .domain([d3.min(dataset, d => d.date), d3.max(dataset, d => d.date)])
        .range([40, w - 20]);
    
    let cScale = d3
        .scaleLinear()
        .domain([1500, 2600])
        .range(["red", "orange"]);
    
    let mainBarLen = (w - 40) / dataset.length - 4;
    let centerBarLen = mainBarLen / 4;
    
    svg
        .selectAll(".centerBars")
        .data(dataset, key)
        .enter()
        .append("rect")
        .classed("bars", true)
        .attr("x", d => xScale(d.date) + 5)
        .attr("height", d => h - 20 - yScale(d.high - d.low))
        .attr("width", centerBarLen)
        .attr("y", d => yScale(d.high))
        .attr("transform", `translate(10, -10)`)
        .style("fill", "#070707");
    
    svg
        .selectAll(".mainBars")
        .data(dataset, key)
        .enter()
        .append("rect")
        .classed("bars", true)
        .attr("x", d => xScale(d.date))
        .attr("height", d => h - 20 - yScale(d.close - d.open))
        .attr("width", mainBarLen)
        .attr("y", d => yScale(d.close))
        .attr("transform", `translate(10, -10)`)
        .style("fill", "#474747");
    
    let xAxis = d3
        .axisBottom(xScale)
        .tickFormat(d3.timeFormat("%b %d"));

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
      .text("Value (Thousands of dollars)");  
}

window.onload = function() {
  d3.csv("candlestick_data.csv", rowConverter).then(data => {
      data.sort((a, b) => a.date - b.date);
      dataset = data;
      createCandlestickChart();
  })
}
