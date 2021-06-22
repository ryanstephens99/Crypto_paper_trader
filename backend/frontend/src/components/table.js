import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2';

// pass parameter props?
// maybe this can allow me to pass props to axios get and refine search
function DynamicChart(props){
    const [chartData, setChartData] = useState({});
    const Chart = () => {
        let dates = [];
        let prices = [];
        console.log(props.toLocaleDateString())
        fetch("api/market", { body: props.toLocaleDateString()})
        .then(response => {
            return response.json();
        })
        .then(data =>{
            console.log(data)
            for(const obj of data){
                let price = parseFloat(obj.price)
                let date = new Date(obj.timestamp);
                date = date.toLocaleString()
                prices.unshift(price);
                dates.unshift(date);
            }
            console.log(dates);
            setChartData({
                labels: dates,
                datasets: [{
                    label: 'price',
                    data: prices,
                }]
            });
        })
        // .catch(err =>{
        //     console.log(err)
        // })
    }
    useEffect(() => {
        Chart();
    }, [props]);
    return (
        <div className="table">
            <h1>Line Chart</h1>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    title: { text: "we hoping out here", display: true },
                    scales: {
                        yAxes: {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    }
                }}
            />
        </div>
    )
}

export default DynamicChart;