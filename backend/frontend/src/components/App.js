
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router, render} from "react-router-dom";

import Navigation from "./navbar";
import DateButton from "./dateButton";
import { DynamicChart, ListingsTable} from "./table";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CoinBaseProData from '../apis/coinbaseAPI';


function App(){
  // const [date, setDate] = useState(new Date());
  const button = DateButton;
  // const [data, setData] = useState([]);
  // useEffect(() => {

  // })
  // const coinbase = CoinBaseProData(dat

  return (
    <Router>
      <div>
      <Navigation/>
      <br/><br/><br/><br/>
      {/* <DatePicker selected={date} onChange={(date) => {
        date = new Date(date.toDateString());
        setDate(date)
      }} /> */}
      <Route
        path="/Coinbase"
        component={ListingsTable}
        // render={(props) => (
        //   <DynamicChart{...props} data={coinbase}/>
        // )}
      />
      </div>
    </Router>
  );
}

export default App;

const container = document.getElementById("app");
ReactDOM.render(<App />, container);
