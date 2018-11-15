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

function createStackedBarChart() {
    let w = 600;
    let h = 500;
    
    let svg = d3
        .select("#stackedBarChart")
        .attr("width", w)
        .attr("height", h);
    
    let stack = d3.stack()
        .keys(["fruit", "meat", "grain", "vegetables", "dairy", "sweets"]);
    
    console.log(dataset);
    
    let series = stack(dataset);
    
    console.log(series);
    
    let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, (d) => {
            return d.fruit + d.meat + d.grain + d.vegetables + d.dairy + d.sweets;
        })])
        .range([h - 20, 20]);
                                
    let xScale = d3
        .scaleTime()
        .domain([0, 7])
        .range([40, w - 20]);
    
    let colors = ["red", "blue", "white", "yellow", "green", "black"];
    
    let groups = svg.selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .style("fill", (d, i) => {
            return colors[i];
        });
    
    let rects = groups.selectAll("rect")
        .data((d) => {return d;})
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i) + 9;
        })
        .attr("y", (d) => {
            return yScale(d[1]);
        })
        .attr("height", (d) => {
            return yScale(d[0]) - yScale(d[1]);
        })
        .attr("width", (w/7) - 20);
        
    let xAxis = d3
        .axisBottom(xScale)
        .ticks(dataset.length)
        .tickFormat(function(d, i) {
            return "Person " + (i + 1);
        });

    let xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(0, ${h - 20})`)
        .call(xAxis);
    
    let yAxis = d3.axisLeft(yScale);

    let yAxisGroup = svg
        .append("g")
        .attr("transform", `translate(40, 0)`)
        .call(yAxis);
}

window.onload = function() {
  d3.csv("dailyFoodData.csv", rowConverter).then(data => {
      data.sort((a, b) => a.date - b.date);
      dataset = data;
      createStackedBarChart();
  })
}
