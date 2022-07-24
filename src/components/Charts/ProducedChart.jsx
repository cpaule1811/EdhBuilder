import React from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

function ProducedChart() {
  const { decklist } = useSelector((state) => state.requestDecklist);

  const options = {
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: ["#2D2D2D"],
      width: 2,
      dashArray: 0,
    },
    colors: ["#0F490F", "#161CEA", "#000000", "#FFFFFF", "#EA1616", "#D3CFCF"],
    labels: ["Green", "Blue", "Black", "White", "Red", "Uncolored"],
    legend: { show: false },
    title: {
      text: "Mana Produced",
      align: "center",
      margin: 10,
    },
    tooltip: {
      fillSeriesColor: false,
      style: {
        color: "#000000",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = () => {
    const a = decklist.map((item) => {
      return { producedMana: item.producedMana, qty: item.quantity };
    });
    return [
      a.reduce(
        (acc, cur) =>
          acc +
          (cur.producedMana && cur.producedMana.includes("G") ? cur.qty : 0),
        0
      ),
      a.reduce(
        (acc, cur) =>
          acc +
          (cur.producedMana && cur.producedMana.includes("U") ? cur.qty : 0),
        0
      ),
      a.reduce(
        (acc, cur) =>
          acc +
          (cur.producedMana && cur.producedMana.includes("B") ? cur.qty : 0),
        0
      ),
      a.reduce(
        (acc, cur) =>
          acc +
          (cur.producedMana && cur.producedMana.includes("W") ? cur.qty : 0),
        0
      ),
      a.reduce(
        (acc, cur) =>
          acc +
          (cur.producedMana && cur.producedMana.includes("R") ? cur.qty : 0),
        0
      ),
      a.reduce(
        (acc, cur) =>
          acc +
          (cur.producedMana && cur.producedMana.includes("C") ? cur.qty : 0),
        0
      ),
    ];
  };

  return (
    <div className="pie-chart">
      <Chart options={options} series={series()} type="pie" width="100%" />
    </div>
  );
}

export default ProducedChart;
