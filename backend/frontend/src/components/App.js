
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router} from "react-router-dom";

import Navigation from "./navbar";
import DateButton from "./dateButton";
import DynamicChart from "./table";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function App(){
  const [date, setDate] = useState(new Date());
  const button = DateButton;
  

  return (
    <Router>
      <div>
      <Navigation/>
      <br/>
      <br/>
      {/* <DatePicker selected={date} onChange={(date) => setDate(date)} /> */}
        <Route path="/chart" component={DynamicChart}/>
      </div>
    </Router>
  );
}

export default App;

const container = document.getElementById("app");
ReactDOM.render(<App />, container);

 // const [placeholder, setPlaceholder] = useState(0);

  // useEffect(() => {
  //   chart = DynamicChart();
  // }, [date])

  // Array.from(priceData).map(dataPoint =>{
  //   prices.push(parseFloat(dataPoint.price));
  //   let date = Date.parse(dataPoint.timestamp)
  //   dates.push(date);
  //   var point = { x: date, y: dataPoint.price}
  //   return point;
  // });

  // const data = {
  //   labels: dates,
  //   datasets: [{
  //     label: 'price',
  //     data: prices,
  //   }]
  // }

  // pricePoints = pricePoints.map(pricePoint => {
  //   pricePoint.price = parseFloat(pricePoint.price)
  //   console.log(pricePoint);
  // });