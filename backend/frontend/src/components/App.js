
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Line from "react-chartjs-2";
import DynamicChart from "./table";

function App(){
  // const [placeholder, setPlaceholder] = useState(0);
  const [priceData, setPriceData] = useState(0);

  useEffect(() => {
    fetch("api/market")
      .then(response => {
        if (response.status > 400) {
          // return setPlaceholder("Something went wrong!");
        }
        return response.json();
      })
      .then(data => {
        // console.log(data);
        setPriceData(data);
      });
  }, [])

  const dates = [];
  const prices = [];

  Array.from(priceData).map(dataPoint =>{
    prices.push(parseFloat(dataPoint.price));
    let date = Date.parse(dataPoint.timestamp)
    dates.push(date);
    var point = { x: date, y: dataPoint.price}
    return point;
  });

  const data = {
    labels: dates,
    datasets: [{
      label: 'price',
      data: prices,
    }]
  }

  // pricePoints = pricePoints.map(pricePoint => {
  //   pricePoint.price = parseFloat(pricePoint.price)
  //   console.log(pricePoint);
  // });

  const chart = DynamicChart();

  return (
    <div>
      {chart}
    </div>
  );
}

export default App;

const container = document.getElementById("app");
render(<App />, container);