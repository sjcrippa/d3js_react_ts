import * as d3 from "d3-scale";

type BarProps = {
	data: number[],
	dimensions: {
		[key: string]: number //the key will always be a string, and de value will always be a number
	}
}

const Bars = (props: BarProps) => {

	const { data, dimensions } = props; // here we are destructuring the props

	const xScale = d3.scaleBand()
		.domain(data.map((d, dNdx) => String(dNdx)))
		.range([0, dimensions.width])
	const yScale = d3.scaleLinear()
		.domain([0, 1])
		.range([0, dimensions.height])

	const barWidth = xScale.bandwidth();
	const rectWidth = isNaN(barWidth) ? "0" : String(barWidth);

	return (
		<svg overflow='visible'>
			{data.map((d, dNdx) => (
				<rect
					height={yScale(d)}
					width={rectWidth}
					x={xScale(String(dNdx))}
					y={dimensions.height - yScale(d)}
					stroke="green"
					fill="red"
				/>
			))}
		</svg>
	)
}

export default Bars