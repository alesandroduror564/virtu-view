/*
Filename: AdvancedDataVisualization.js

This code is a complex example of data visualization using JavaScript.
It demonstrates how to create an interactive line chart with multiple series, tooltips,
and zoom functionality. It also includes advanced features like data streaming and
real-time updates.

Author: [Your Name]

*/

// Include necessary libraries
<script src="https://d3js.org/d3.v6.min.js"></script> // D3.js library for data visualization
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script> // Moment.js for handling time

// Define chart dimensions
const width = 800; // Width of the chart
const height = 400; // Height of the chart
const margin = { top: 20, right: 30, bottom: 50, left: 50 }; // Margins around the chart

// Create SVG container
const svg = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Define data
const data = [
  { date: "2021-01-01", series1: 15, series2: 25 },
  { date: "2021-02-01", series1: 45, series2: 35 },
  { date: "2021-03-01", series1: 30, series2: 50 },
  // Add more data...
];

// Parse dates using Moment.js
const parseDate = d3.timeParse("%Y-%m-%d");
data.forEach((d) => {
  d.date = parseDate(d.date);
});

// Define scales
const xScale = d3
  .scaleTime()
  .domain(d3.extent(data, (d) => d.date))
  .range([0, width]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => Math.max(d.series1, d.series2))])
  .range([height, 0]);

// Define line generators
const line1 = d3
  .line()
  .x((d) => xScale(d.date))
  .y((d) => yScale(d.series1));

const line2 = d3
  .line()
  .x((d) => xScale(d.date))
  .y((d) => yScale(d.series2));

// Draw axes
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

svg.append("g").attr("class", "y-axis").call(yAxis);

// Draw lines
svg
  .append("path")
  .datum(data)
  .attr("class", "line line1")
  .attr("d", line1);

svg
  .append("path")
  .datum(data)
  .attr("class", "line line2")
  .attr("d", line2);

// Add tooltips
const tooltip = d3
  .select("#chart-container")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

const bisectDate = d3.bisector((d) => d.date).left;

svg
  .append("rect")
  .attr("class", "overlay")
  .attr("width", width)
  .attr("height", height)
  .on("mouseover", () => tooltip.style("opacity", 1))
  .on("mousemove", handleMouseMove)
  .on("mouseout", () => tooltip.style("opacity", 0));

function handleMouseMove(event) {
  const mouseX = d3.pointer(event)[0];
  const invertedX = xScale.invert(mouseX);
  const index = bisectDate(data, invertedX, 1);
  const targetData = data[index];

  tooltip
    .html(
      `
      <div>Date: ${moment(targetData.date).format("YYYY-MM-DD")}</div>
      <div>Series 1 Value: ${targetData.series1}</div>
      <div>Series 2 Value: ${targetData.series2}</div>
    `
    )
    .style("transform", `translate(${mouseX}px, ${yScale(targetData.series1)}px)`)
    .style("opacity", 1);
}

// Add zoom functionality
const zoom = d3.zoom().on("zoom", handleZoom);

svg.call(zoom);

function handleZoom(event) {
  const newXScale = event.transform.rescaleX(xScale);
  svg.select(".x-axis").call(xAxis.scale(newXScale));
  svg.selectAll(".line").attr("d", (d) => line.x((d) => newXScale(d.date)));
}

// Real-time updates (data streaming)
function updateData(newData) {
  const updatedData = [
    ...data.slice(1), // Remove the oldest data point
    newData, // Append the new data point
  ];

  xScale.domain(d3.extent(updatedData, (d) => d.date));
  yScale.domain([0, d3.max(updatedData, (d) => Math.max(d.series1, d.series2))]);

  svg.select(".x-axis").transition().call(xAxis);
  svg.select(".y-axis").transition().call(yAxis);

  svg.select(".line1").datum(updatedData).transition().attr("d", line1);
  svg.select(".line2").datum(updatedData).transition().attr("d", line2);
}

// Example of data streaming and real-time updates
setTimeout(() => {
  const newData = {
    date: "2021-04-01",
    series1: 20,
    series2: 40,
  };
  updateData(newData);
}, 5000); // Update data after 5 seconds