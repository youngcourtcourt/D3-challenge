// Define SVG Width
var svgWidth=960
var svgHeight=500

// Define margins

var margin={
    top:60,
    bottom:60, 
    right:60, 
    left:60
}

// Define width of chart

var chartWidth=svgWidth-margin.left-margin.right
var chartHeight=svgHeight-margin.top-margin.bottom

// Select scatter section of index.html

var svg=d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)

// Append group to scatter section and move it down the page

var chartGroup=svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)


// Read in csv

d3.csv("data.csv").then(function(data){
    
// Cast each value as integer

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
    
// Scale selected data to fit intended chart width and height

var xLinearScale=d3.scaleLinear()
            .domain([8, d3.max(data, d=>d.poverty)+1])
            .range([0, chartWidth])

var yLinearScale=d3.scaleLinear()
    .domain([8,d3.max(data, d=>d.smokes)])
    .range([chartHeight, 0])

// Create axes using the scales we defined

var bottomAxis=d3.axisBottom(xLinearScale)

var leftAxis=d3.axisLeft(yLinearScale)

// Append axes to chart

chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis)
chartGroup.append("g").call(leftAxis)

// Add circles to chart using our data to define positioning on page

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

// Add state to circles, making sure to select "null" rather than "text" to guarantee that our enter() command always works

var textGroup=chartGroup.selectAll(null)
.data(data)
.enter()
.append("text")
.attr("x", d=>xLinearScale(d.poverty))
.attr("y", d=>yLinearScale(d.smokes))
.text(d=>d.abbr)
.attr("text-anchor", "middle")
.attr("fill", "white")
.attr("font-size", 11)
.attr("font-weight", "bold")

// Add axis labels

chartGroup.append("text")
    .attr("transform", `translate(${chartWidth/2}, ${chartHeight+margin.top-10})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "25px")
    .attr("fill", "black")
    .text("Poverty %")

chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0-margin.left)
.attr("x", 0-(chartHeight/2))
.attr("dy", "1em")
.attr("font-size", "25px")
.attr("fill", "black")
.text("Smokes %")

// Add tooltip
 
var toolTip=d3.tip()
        .attr("class", "d3-tip")
        .offset([0,-1])
        .html(function(d){
            return(`<strong>State: ${d.state}</strong><hr>Poverty: ${d.poverty} Smokes: ${d.smokes}`)
        })

chartGroup.call(toolTip)

circlesGroup.on("mouseover", function(d){
    toolTip.show(d,this)
})
.on("mouseout", function(d){
    toolTip.hide(d,this)
})


})