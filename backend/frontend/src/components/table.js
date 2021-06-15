import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2';


const DynamicChart = () => {
    const [chartData, setChartData] = useState({});

    const Chart = () => {
        let dates = [];
        let prices = [];
        axios.get("http://localhost:8000/api/market")
        .then(dat => {
            console.log(dat.data);
            for(const obj of dat.data){
                prices.push(parseFloat(obj.price));
                dates.push(Date.parse(obj.timestamp));
            }
            setChartData({
                labels: dates,
                datasets: [{
                    label: 'price',
                    data: prices,
                }]
            });
        })
        .catch(err =>{
            console.log(err)
        })
    }
    useEffect(() => {
        Chart();
    }, []);
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