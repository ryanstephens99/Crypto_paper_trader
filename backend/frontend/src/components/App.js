// import React from 'react';
// import { Switch, Route, Link} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return(
//     <div>

//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Line from "react-chartjs-2";

function App(){
  const [placeholder, setPlaceholder] = useState(0);
  const [priceData, setPriceData] = useState(1);

  useEffect(() => {
    fetch("api/market")
      .then(response => {
        if (response.status > 400) {
          return setPlaceholder("Something went wrong!");
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setPriceData(data);
      });
  }, [])

  var listElem = Array.from(priceData).map(function (pricePoint) {
    return <li> {pricePoint.price} : {pricePoint.timestamp} </li>
  });
  
  const dates = [];
  const prices = [];

  var pricePoints = Array.from(priceData).map(dataPoint =>{
    prices.push(parseFloat(dataPoint.price));
    let date = Date.parse(dataPoint.timestamp)
    dates.push(date);
    console.log(date)
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
  console.log(pricePoints);

  return (
    <Line data={data}/>
  );
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       loaded: false,
//       placeholder: "Loading"
//     };
//   }

//   componentDidMount() {
//     fetch("api/market")
//       .then(response => {
//         if (response.status > 400) {
//           return this.setState(() => {
//             return { placeholder: "Something went wrong!" };
//           });
//         }
//         return response.json();
//       })
//       .then(data => {
//         this.setState(() => {
//           console.log(data);
//           return {
//             data,
//             loaded: true
//           };
//         });
//       });
//   }

//   render() {
//     return (
//       <ul>
//         {this.state.data.map(contact => {
//           return (
//             <li key={contact.id}>
//               {contact.name} - {contact.email}
//             </li>
//           );
//         })}
//       </ul>
//     );
//   }
// }

export default App;

const container = document.getElementById("app");
render(<App />, container);