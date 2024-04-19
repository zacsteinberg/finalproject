const movies = d3.csv("https://raw.githubusercontent.com/zacsteinberg/project/main/movie_data_master.csv");

const countryCount = {};
movies.then(function(data) {
    // Get count of Main 
    data.forEach(function(movie) {
        
        // Log the entire movie object to inspect its structure
        console.log("Movie:", movie);

        // Extract the lead production country from the movie data
        const mainCountry = movie['Lead Production Country'];

        // Log the main country to see if it's correctly extracted
        console.log("Main Country:", mainCountry);

        // If the main country already exists in countryCount, increase its count, otherwise set count to 1
        if (countryCount[mainCountry]) {
            countryCount[mainCountry]++;
        } else {
          countryCount[mainCountry] = 1;
        }
    });

    // Log the country counts
    console.log("Country Counts:", countryCount);

    const countryData = Object.keys(countryCount).map(country => ({ country: country, count: countryCount[country] }));
    countryData.sort((a, b) => b.count - a.count);


   let 
     width = 500,
     height = 1000;
    
   let margin = {
     top: 40,
     bottom: 30,
     left: 50,
     right: 30
   };
  
   let centerX = (window.innerWidth - width) / 2;

   // Create the SVG container
  let svg = d3
  .select('#plot')
  .append('svg')
    .attr('width', width + 50)
    .attr('height', height + 50)
    .style('margin', 'center')
    .style('background', '#FFFFFF');


  // Set up scales for x and y axes
  let xScale = d3.scaleLinear()
  .domain([0, d3.max(countryData, d => d.count)])
  .range([margin.left, width - margin.right]);

let yScale = d3.scaleBand()
  .domain(countryData.map(d => d.country))
  .range([margin.top, height - margin.bottom]);

  let yAxis = svg
    .append('g')
      .attr('transform', `translate(${margin.left + 70},-20)`)
      .call(d3.axisLeft().scale(yScale));
 
  let xAxis = svg
    .append('g')
      .attr('transform', `translate(70,${height - margin.bottom - 20})`)
      .call(d3.axisBottom().scale(xScale));

  // Add x-axis label
  xAxis
    .append('text')
      .attr('x', 220)
      .attr('y', 40)
      .style('fill', 'black')
      .attr("font-size", "16px")
      .attr("font-family", "Times New Roman")
      .text('Count of Movies in Each Country');

  let bars = svg
    .selectAll('rect')
      .data(countryData)
    .enter()
    .append('rect')
      .attr('x', margin.left + 70)
      .attr('y', d => yScale(d.country) - 20)
      .attr('width', d => xScale(d.count) - margin.left)
      .attr('height', yScale.bandwidth() - 3)
      .attr('fill', 'steelblue')  

      .on("click",function(d) {
        let rect = d3.select(this);
        if (rect.attr("fill") == "steelblue") {
          rect.attr("fill", "red");
        } else {
          rect.attr("fill", "steelblue");
    }
});

});
 