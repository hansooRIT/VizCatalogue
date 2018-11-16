let dataset = [
    [453, 210, 555, 612, 312],
    [125, 620, 578, 432, 89],
    [385, 647, 885, 253, 482],
    [543, 682, 713, 356, 512],
    [259, 942, 315, 842, 657]
]

//https://beta.observablehq.com/@mbostock/d3-chord-diagram

function createChord() {
    let w = 700, h = 700;
    let outerRadius = Math.min(width, height) * 0.5 - 30;
    let innerRadius = outerRadius - 20;
    
    let svg = d3.select("#chord")
        .attr('width', w)
        .attr('height', h);
    
    let chords = d3.chord(dataset)
        .padAngle(0.05);
    
    let ribbon = d3.ribbon()
        .radius(innerRadius);
    
    console.log(chords);
    
    let group = svg.append("g")
        .selectAll("g")
        .data(chords.groups)
        .enter()
        .append("g");
    
    let color = d3.scaleOrdinal()
        .domain(d3.range(5))
        .range(d3.schemePastel2);
    
    group.append("path")
        .attr("fill", d => color(d.index))
        .attr("stroke", d => d3.rgb(color(d.index)).darker())
        .attr("d", arc);
    
    console.log("memes");
}

window.onload = function() {
  // do d3 stuff here...
    createChord();
}
