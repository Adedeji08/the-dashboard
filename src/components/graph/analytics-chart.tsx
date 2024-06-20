import React, { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { CircleLoader } from "react-spinners";

interface ChartData {
  name: string;
  value: number;
}

interface DataChart {
  chartdata: ChartData[];
  chartType?: string;
}

const AnalyticsChart = ({ chartdata, chartType }: DataChart) => {
  const [loading, setLoading] = useState(true);
  const chartRef = useRef<any>(null);
  useEffect(() => {
    if (chartdata.length > 0) {
      setLoading(false);
    }
  }, [chartdata]);

  const dataAxis = chartdata?.map((item) => item.name);
  const data = chartdata?.map((item) => item.value);
  const yMax = Math.max(...data) + 50;

  const option = {
    grid: {
      containLabel: true,
      top: 20,
      left: 10,
      right: 40,
      bottom: 21,
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: false,
        color: "#8A8A8A",
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
        color: "#8A8A8A",
        formatter: (value: any) => {
          if (chartType === "payment" || chartType === "transaction") {
            return `NGN ${value}`;
          } else {
            return value;
          }
        },
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const { name, value } = params[0].data;
        if (chartType === "payment" || chartType === "transaction") {
          return `${name}: NGN ${value.toLocaleString()}`;
        } else {
          return `${name}: ${value.toLocaleString()}`;
        }
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#CFEEF9" },
            { offset: 0.5, color: "#0979A1" },
            { offset: 1, color: "#0979A1" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#0979A1" },
              { offset: 0.7, color: "#0979A1" },
              { offset: 1, color: "#CFEEF9" },
            ]),
          },
        },
        data: data.map((value, index) => ({
          // Map data to include name and value for tooltip
          name: dataAxis[index],
          value: value,
        })),
        label: {
          formatter: (params: any) => {
            return `NGN ${params.value.toLocaleString()}`;
          },
        },
      },
    ],
  };

  return (
    <>
      {loading ? (
        <div className="py-28 px-44">
          <CircleLoader color="#0979A1" />
        </div>
      ) : (
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: "350px", width: "100%" }}
        />
      )}
    </>
  );
};
export default AnalyticsChart;
