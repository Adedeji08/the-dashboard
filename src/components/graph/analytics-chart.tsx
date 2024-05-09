import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts'; // Import echarts

const AnalyticsChart: React.FC = () => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chartInstance = chartRef.current.getEchartsInstance(); // Access the ECharts instance
    const zoomSize = 6;

    const handleClick = (params: any) => {
      const { dataAxis, data } = params.series[0].option;
      console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
      console.log({
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
      });
    };

    chartInstance.on('click', handleClick); // Attach click event listener

    // Clean up the event listener when component unmounts
    return () => {
      chartInstance.off('click', handleClick);
    };
  }, []);

  const dataAxis = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
  const yMax = 500;

  const option = {
  
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: '#fff',
      },
      
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#999',
      },
    },
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#CFEEF9' },
            { offset: 0.5, color: '#0979A1' },
            { offset: 1, color: '#0979A1' },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' },
            ]),
          },
        },
        data: data,
      },
    ],
  };

  return <ReactECharts ref={chartRef} option={option} style={{ height: '350px' }} />;
};

export default AnalyticsChart;
