// @TODO: YOUR CODE HERE!

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
})