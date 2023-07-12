import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarChartProps {
  data: { label: string; value: number }[];
  width: number;
  height: number;
}

const Bars: React.FC<BarChartProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (data.length === 0 || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([height, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll('rect')
      .data(data)
      .join(
        (enter) =>
          enter
            .append('rect')
            .attr('x', (d) => xScale(d.label)!)
            .attr('y', height)
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            .attr('fill', (d) => colorScale(d.label))
            .call((enter) =>
              enter
                .transition()
                .duration(1000)
                .attr('y', (d) => yScale(d.value))
                .attr('height', (d) => height - yScale(d.value))
            ),
        (update) =>
          update.call((update) =>
            update
              .transition()
              .duration(1000)
              .attr('x', (d) => xScale(d.label)!)
              .attr('y', (d) => yScale(d.value))
              .attr('height', (d) => height - yScale(d.value))
          )
      );

    const xAxis = d3.axisBottom(xScale);
    svg.select('.x-axis').call(xAxis as any);

    const yAxis = d3.axisLeft(yScale);
    svg.select('.y-axis').call(yAxis as any);
  }, [data, height, width]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <g className="x-axis" transform={`translate(0, ${height})`} />
      <g className="y-axis" />
    </svg>
  );
}

export default Bars