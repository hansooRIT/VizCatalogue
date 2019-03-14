let dataset = [
    [4530, 2100, 555, 6120, 3120],
    [1250, 6200, 578, 4320, 890],
    [3850, 6470, 885, 2530, 4820],
    [5430, 6820, 713, 3560, 5120],
    [2590, 9420, 315, 8420, 6570]
];

//https://beta.observablehq.com/@mbostock/d3-chord-diagram

function groupTicks(d, step) {
  const k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, step).map(value => {
    return {value: value, angle: value * k + d.startAngle};
  });
}

function createChord() {
    let w = 900, h = 600;
    let outerRadius = Math.min(w, h) * 0.5 - 30;
    let innerRadius = outerRadius - 20;
    let formatValue = d3.formatPrefix(",.0", 1e3);
    
    let svg = d3.select("#chord")
        .attr("viewBox", [0, -h / 2, 300, h])
        .attr('width', 900)
        .attr('height', h);
    
    let chord = d3.chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending);
    
    const chords = chord(dataset);
    
    let ribbon = d3.ribbon()
        .radius(innerRadius);
    
    let arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    let color = d3.scaleOrdinal()
        .domain(d3.range(5))
        .range(d3.schemePastel2);
    
    let group = svg.append("g")
        .selectAll("g")
        .data(chords.groups)
        .enter().append("g");

    group.append("path")
        .attr("fill", d => color(d.index))
        .attr("stroke", d => d3.rgb(color(d.index)).darker())
        .attr("d", arc);
    
    const groupTick = group.append("g")
    .selectAll("g")
    .data(d => groupTicks(d, 1e3))
    .enter().append("g")
      .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius},0)`);

      groupTick.append("line")
          .attr("stroke", "#000")
          .attr("x2", 6);

      groupTick
        .filter(d => d.value % 5e3 === 0)
        .append("text")
          .attr("x", 8)
          .attr("dy", ".35em")
          .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
          .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
          .text(d => formatValue(d.value));
    
    svg.append("g")
        .attr("fill-opacity", 0.67)
    .selectAll("path")
    .data(chords)
    .enter().append("path")
      .attr("d", ribbon)
      .attr("fill", d => color(d.target.index))
      .attr("stroke", d => d3.rgb(color(d.target.index)).darker());
    
    let legendScale = d3.scaleOrdinal()
          .domain(["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"])
          .range(color.range());

    svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(300,-240)");

    // see https://github.com/d3/d3-shape#symbols for information about d3 symbol shapes
    var legendOrdinal = d3.legendColor()
        .shape("path", d3.symbol().type(d3.symbolSquare).size(60)())
        .shapePadding(10)
        .scale(legendScale);

    svg.select(".legendOrdinal")
        .call(legendOrdinal);
    
}

window.onload = function() {
  // do d3 stuff here...
    createChord();
}
