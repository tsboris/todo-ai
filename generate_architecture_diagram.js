const d3 = require('d3');
const fs = require('fs');
const { JSDOM } = require('jsdom');

// Create a virtual DOM
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;

// Create SVG
const width = 800;
const height = 600;
const svg = d3.select(document.body)
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('xmlns', 'http://www.w3.org/2000/svg');

// Define components
const components = [
  { name: 'Frontend (React)', x: 100, y: 100 },
  { name: 'Backend (Express)', x: 400, y: 100 },
  { name: 'Database (MongoDB)', x: 400, y: 300 },
  { name: 'Docker Network', x: 50, y: 50, width: 700, height: 400 }
];

// Draw Docker network
svg.append('rect')
  .attr('x', components[3].x)
  .attr('y', components[3].y)
  .attr('width', components[3].width)
  .attr('height', components[3].height)
  .attr('fill', 'none')
  .attr('stroke', 'blue')
  .attr('stroke-dasharray', '5,5');

svg.append('text')
  .attr('x', components[3].x + 10)
  .attr('y', components[3].y + 30)
  .text(components[3].name)
  .attr('fill', 'blue');

// Draw components
components.slice(0, 3).forEach(component => {
  svg.append('rect')
    .attr('x', component.x)
    .attr('y', component.y)
    .attr('width', 200)
    .attr('height', 100)
    .attr('fill', 'lightgray')
    .attr('stroke', 'black');

  svg.append('text')
    .attr('x', component.x + 100)
    .attr('y', component.y + 55)
    .attr('text-anchor', 'middle')
    .text(component.name);
});

// Draw arrows
svg.append('arrow')
  .attr('marker-end', 'url(#arrow)')
  .attr('x1', 300)
  .attr('y1', 150)
  .attr('x2', 400)
  .attr('y2', 150);

svg.append('arrow')
  .attr('marker-end', 'url(#arrow)')
  .attr('x1', 500)
  .attr('y1', 200)
  .attr('x2', 500)
  .attr('y2', 300);

// Define arrow marker
svg.append('defs').append('marker')
  .attr('id', 'arrow')
  .attr('viewBox', '0 -5 10 10')
  .attr('refX', 8)
  .attr('refY', 0)
  .attr('markerWidth', 6)
  .attr('markerHeight', 6)
  .attr('orient', 'auto')
  .append('path')
  .attr('d', 'M0,-5L10,0L0,5')
  .attr('fill', 'black');

// Save SVG to file
fs.writeFileSync('architecture_diagram.svg', document.body.innerHTML);

console.log('SVG diagram generated: architecture_diagram.svg');