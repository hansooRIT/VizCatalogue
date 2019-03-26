
function createDonutChart() {
  // dataset for this pie chart
  let dataset = [
      {name: "Steak", value: 43 }, 
      {name: "Chicken", value: 38}, 
      {name: "Tofu", value: 6}, 
      {name: "Veggies", value: 10}, 
      {name: "Ground beef", value:25},
      {name: "Pork", value: 23}, 
      {name: "Shrimp", value: 32}]; 

  // d3.pie will sort our values, but it does so in a way that 
  // makes the color scale mapping hard to predict, so it's easier
  // to sort ourselves
  dataset.sort((a,b) => b.value - a.value);

  // settings for our pie chart 
  let w = 600;
  let h = 500;
  let innerRadius = h/2 - 50;       
  let outerRadius = h/2;

  // create our SVG element
  let svg = d3
    .select("#donutChart")
    .attr("width", w)
    .attr("height", h);

  // create D3 pie layout that converts 
  // dataset into one appropriate for pie charts 
  let pie = d3.pie()
              .value(d => d.value);       

  // create D3 arc generator we will use for pie layout 
  let arc = d3.arc()
              .innerRadius(innerRadius)
              .outerRadius(outerRadius);


  // use a color scale for the bar colors
  // ordinal scales created given an array of output range values
  // usually used by giving input indices into array 
  let cScale = d3.scaleOrdinal(d3.schemeCategory10);

  let arcs = 
    svg.selectAll('g.arc')
        .data(pie(dataset))
        .enter()
        .append('g')
          .attr('class', 'arc')
          .attr('transform', `translate(${h/2}, ${h/2})`);
 
  // append an SVG path to each g element for the pie wedge
  // uses the arc generator we configured earlier 
  arcs.append('path')
    .attr('fill', (d,i) => cScale(i))
    .attr('d', arc)
    .append('title')
      .text(d => d.data.name);

  // now append text elements to each 'g' pie wedge
  arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => d.value);
    
  let legendScale = d3.scaleOrdinal()
          .domain(["Steak", "Chicken", "Tofu", "Veggies", "Ground beef", "Pork", "Shrimp"])
          .range(cScale.range());

    svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(220, 160)");

    // see https://github.com/d3/d3-shape#symbols for information about d3 symbol shapes
    var legendOrdinal = d3.legendColor()
        .shape("path", d3.symbol().type(d3.symbolSquare).size(60)())
        .shapePadding(10)
        .scale(legendScale);

    svg.select(".legendOrdinal")
        .call(legendOrdinal);
}

window.onload = function() {
  // console.table is very handy for viewing row/column data
  createDonutChart();
};
          