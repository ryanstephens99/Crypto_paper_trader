
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, render} from "react-router-dom";

import Navigation from "./navbar";
import DateButton from "./dateButton";
import ListingsTable from "./table2";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { CRYPTO_COMPARE_API_KEY } from "./config";

import { CryptoPriceProvider } from "react-realtime-crypto-prices";



function App(){
  // const [date, setDate] = useState(new Date());
  const button = DateButton;
  // const [data, setData] = useState([]);
  // useEffect(() => {

  // })
  // const coinbase = CoinBaseProData(dat
  console.log("in app")
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
        render={() => (
          <ListingsTable/>
        )}
      />
      </div>
    </Router>
  );
}

export default App;

const container = document.getElementById("app");
ReactDOM.render(
  <CryptoPriceProvider cryptoCompareApiKey={CRYPTO_COMPARE_API_KEY}>
    <App />
  </CryptoPriceProvider>,
  container
);
