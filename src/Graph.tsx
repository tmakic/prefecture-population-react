import React, { useMemo } from "react";
import { Population } from "./types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const Graph = ({
  boundaryYear,
  totalPopulation
}: {
  boundaryYear: number;
  totalPopulation: Population[];
}) => {
  /**
   * X軸の目盛り
   */
  const getXAxisCategory = () => {
    const array: number[] = [];
    const firstPrefData = totalPopulation[0];
    if (!firstPrefData) return [];
    firstPrefData.data.forEach((v) => {
      if (v.year <= boundaryYear) {
        array.push(v.year);
      }
    });
    return array;
  };

  /**
   * グラフデータ
   */
  const chartData = () => {
    const array: { name: string; data: number[] }[] = [];
    totalPopulation.forEach((prefData) => {
      // 全部の年の値を1つの配列にまとめる
      const dataArray: number[] = [];
      prefData.data.forEach((v) => {
        // boundaryYearより前の年（実績値）だけ追加
        if (v.year <= boundaryYear) {
          dataArray.push(v.value);
        }
      });
      array.push({
        name: prefData.prefName,
        data: dataArray
      });
    });
    return array;
  };

  /**
   * highchartsのオプション
   */
  const getOptions = () => {
    return {
      // NOTE: y軸ラベルが見切れないようにダミーのタイトルを入れている
      title: {
        text: "dummy",
        style: {
          color: "transparent"
        }
      },
      yAxis: {
        title: {
          text: "人口数",
          align: "high",
          offset: 0,
          rotation: 0,
          x: -8,
          y: -20,
          style: {
            "font-size": "16px",
            "font-weight": "600"
          }
        },
        labels: {
          // NOTE: TSエラーが解消できず回避
          // formatter: (): string => {
          //   if (!this) return "";
          //   const ctx: AxisLabelsFormatterContextObject = this!;
          //   return String(ctx.value);
          // }
        }
      },
      xAxis: {
        categories: getXAxisCategory(),
        title: {
          text: "年度",
          align: "high",
          offset: 6,
          x: 50,
          style: {
            "font-size": "16px",
            "font-weight": "600"
          }
        }
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          }
        }
      },
      series: chartData(),
      tooltip: {
        // NOTE: TSエラーが解消できず回避
        // formatter: (): string => {
        //   if (!this) return "";
        //   const ctx: TooltipFormatterContextObject = this!;
        //   return `<p>${ctx.series.name}</p><br><p>${
        //     ctx.x
        //   }年: ${ctx.y} 人</p>`;
        // }
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom"
              }
            }
          }
        ]
      }
    };
  };

  const options = useMemo(getOptions, [boundaryYear, totalPopulation]);

  return (
    <HighchartsReact
      className="Graph"
      highcharts={Highcharts}
      options={options}
    />
  );
};
