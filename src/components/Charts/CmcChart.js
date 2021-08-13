import React from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";


function CmcChart() {
   const { decklist } = useSelector(state => state.requestDecklist)

   const catagories = () => {
       return [...new Set(decklist
        .filter(item => !item.type.includes("Land"))
        .map(item => item.cmc))]
        .sort((a, b) => a - b)
   }

   const data = () => {
      const data = [];
      catagories().forEach(el => {
           data.push(decklist.reduce((acc, cur) => acc+((cur.cmc) === el && !cur.type.includes("Land") ? cur.quantity : 0),0))
      })
      return data;
   }

    const options = {
        chart: {
          id: "basic-bar",
          toolbar: { 
            show: false
          }
        },
        yaxis: {
           show: false
        },
        xaxis: {
          categories: catagories(),
          fillColor: '#5f0a87'
        },
        title: {
           text: "Mana Curve",
           offsetY: 20,
           align: "center"
        },
        colors: ['#5f0a87']
      }
      const series= [
        {
          name: "Mana-Curve",
          data: data()
        }
      ]

    return (
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="bar"
            width="100%"
          />
        </div>
    );
}

export default CmcChart;