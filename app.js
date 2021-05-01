// @TODO: YOUR CODE HERE!
var svgWidth=960
var svgHeight=500

var margin={
    top:60,
    bottom:60, 
    right:60, 
    left:60
}

var chartWidth=svgWidth-margin.left-margin.right
var chartHeight=svgHeight-margin.top-margin.bottom

var svg=d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)

var chartGroup=svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)



d3.csv("data.csv").then(function(data){
    console.log(data)

    data.forEach(d=>{

        d.poverty= +d.poverty
        d.povertyMoe= +d.povertyMoe
        d.age= +d.age
        d.ageMoe= +d.ageMoe
        d.income= +d.income
        d.incomeMoe= +d.incomeMoe
        d.healthcare= +d.healthcare
        d.healthcareLow= +d.healthcareLow
        d.heatlhcareHigh= +d.heatlhcareHigh
        d.obesity= +d.obesity
        d.obesityLow= +d.obesityLow
        d.obesityHigh= +d.obesityHigh
        d.smokes= +d.smokes
        d.smokesLow= +d.smokesLow
        d.smokesHigh= +d.smokesHigh
    })

var xLinearScale=d3.scaleLinear()
            .domain([8, d3.max(data, d=>d.poverty)])
            .range([0, chartWidth])
var yLinearScale=d3.scaleLinear()
    .domain([8,d3.max(data, d=>d.smokes)])
    .range([chartHeight, 0])

var bottomAxis=d3.axisBottom(xLinearScale)

var leftAxis=d3.axisLeft(yLinearScale)

chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis)
chartGroup.append("g").call(leftAxis)

var circlesGroup=chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d=>xLinearScale(d.poverty))
        .attr("cy", d=>yLinearScale(d.smokes))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", "0.5")
        .attr("stroke-width", "1")
        .attr("stroke", "black")


var textGroup=chartGroup.selectAll("text")
.data(data)
.enter()
.append("text")
.attr("dx", d=>xLinearScale(d.poverty))
.attr("dy", d=>yLinearScale(d.smokes))
.text(d=>d.abbr)
.attr("r", "10")
.attr("font-size", 10)
 

            

})