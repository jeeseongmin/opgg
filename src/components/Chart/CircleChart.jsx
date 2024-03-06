import React, {useState} from 'react';
import ECharts from 'echarts-for-react';

const CircleChart = () => {
	const [options, setOptions] = useState({
		series: [
			{
				type: 'pie',
				radius: ['49%', '70%'],
				top: '-30%',
				left: '-18%',
				width: '120px',
				height: '160px',
				animation: false,
				label: {
					show: true,
					position: 'center',
					color: '#5383E8',
					fontSize: '13px',
				},
				emphasis: {
					disabled: true,
				},
				data: [
					{
						value: 70, name: '70%', itemStyle: {
							color: '#5383E8',
						},
					},
					{
						value: 30, name: 'b', itemStyle: {
							color: '#E84057',
						},
					},
				],
			},
		],
	});
	
	return (
		<div style={{width: '100px', height: '100px'}}>
			<ECharts
				option={options}
				opts={{renderer: 'svg', width: 'auto', height: '100px'}}
			/>
		</div>
	);
};

export default CircleChart;
