import * as d3 from 'd3';

const data = [
  { k: 1, v: 1, },
  { k: 2, v: 4, },
  { k: 3, v: 9, },
  { k: 4, v: 16, },
  { k: 5, v: 25, }
];

const x = d3.scaleLinear() // 선형 그래프
  .domain([0, d3.max(data, d => d.v)]) // 실제 데이터들의 범위를 지정한다.
  .range([0, 250]); // 화면에 렌더링되는 구간의 범위를 px 단위로 지정한다.

const chart = d3.select('#line-graph') // 그래프의 크기를 지정한다.
  .attr('width', 250) // 가로 : 250px
  .attr('height', 25 * data.length); // 세로 : 25px * 데이터의 개수

const bar = chart.selectAll('g')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', (d, i) => `translate(0, ${ i * 25 })`); // 바마다 25px만큼 간격을 준다.

bar.append('rect') // <g> 안에 <rect>를 추가한다.
  .attr('width', d => x(d.v)) // <rect>의 가로길이는 데이터의 값을 range에 매핑한 값이다.
  .attr('height', 20) // <rect>의 세로길이는 20이다.
  .attr('fill', '#f00'); // rect는 붉은 색으로 칠한다.

bar.append('text') // <g> 안에 <text>를 추가한다.
  .attr('x', 0) // <text>의 x절대좌표는 0이다.
  .attr('y', 10) // <text>의 y절대좌표는 10이다.
  .attr('dy', 5) // <text>의 y상대좌표는 5이다.
  .attr('fill', '#000') // <text>는 흰색이다.
  .text(d => d.v); // <text>의 텍스트는 데이터의 값이다.

