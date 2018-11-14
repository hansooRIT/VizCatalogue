let dataset;

function rowConverter(d) {
    return {
        startingSalary: parseFloat(d.startingSalary),
        gpa: parseFloat(d.gpa)
    };
}

function createScatterplot() {
    let w = 600;
    let h = 500;
    
    let gpaMin = d3.min(dataset, (d) => d.gpa);
    let gpaMax = d3.max(dataset, (d) => d.gpa);
    let salaryMin = d3.min(dataset, (d) => d.startingSalary);
    let salaryMax = d3.max(dataset, (d) => d.startingSalary);
    
    let svg = d3
        .select("#scatterPlot")
        .attr("width", w)
        .attr("height", h);
    
    let yScale = d3
        .scaleLinear()
        .domain([salaryMin, 100000])
        .range([h - 20, 20]);
                                
    let xScale = d3
        .scaleLinear()
        .domain([gpaMin, 4.0])
        .range([50, w - 20]);
    
    svg
        .selectAll("circles")
        .data(dataset)
        .enter()
        .append("circle")
        .attr('cx', (d) => xScale(d.gpa))
        .attr('cy', (d) => yScale(d.startingSalary))
        .attr('fill', 'blue')
        .attr('r', 5);
    
    let xAxis = d3
        .axisBottom(xScale);

    let xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(0, ${h - 20})`)
        .call(xAxis);
    
    let yAxis = d3.axisLeft(yScale);

    let yAxisGroup = svg
        .append("g")
        .attr("transform", `translate(50, 0)`)
        .call(yAxis);

}

window.onload = function() {
  d3.csv("salaryData.csv", rowConverter).then(data => {
      dataset = data;
      createScatterplot();
  })
}
