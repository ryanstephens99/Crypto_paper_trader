import React, {useEffect, useState} from 'react';
import { CRYPTO_COMPARE_API_KEY, CRYPTO_COMPARE_URI } from "./config";
import { useCryptoPrices } from "react-realtime-crypto-prices";
import { Line } from "react-chartjs-2";
import axios from 'axios';


function WSChart(props) {

    const [chartData, setChartData] = useState({});
    const [prices, setPrices] = useState([]);
    const [times, setTimes] = useState([]);
    const [first, setFirst] = useState(true)

    var m = new Date(Math.ceil(Date.now() / 300000) * 300000)
    const [minute, setMinute] = useState(m);

    const data = (name) => {
        let date = new Date()
        let start = date.toLocaleDateString()
        start = Date.parse(start);
        // get number of minutes since day started to be used for limit param
        var batchSize = Math.floor((date.getTime() - start) / 300000);
        axios.get(CRYPTO_COMPARE_URI + "v2/histominute",
            {
                params:
                {
                    fsym: name,
                    tsym: "USD",
                    limit: batchSize,
                    api_key: CRYPTO_COMPARE_API_KEY
                }
            }).then(data => {
                data = data.data.Data.Data
                let ds = [];
                let ps = [];
                for (const obj of data) {
                    let price = obj["open"]
                    let date = new Date(obj["time"] * 1000);
                    date = date.toLocaleString()
                    ps.push(price);
                    ds.push(date);
                }
                setPrices(ps);
                setTimes(ds);
            })
    }
    useEffect(() => { data(props.name) }, [props.name]);


    var lastPrice = useCryptoPrices([props.name])

    useEffect(() => {
        if (lastPrice[props.name.toLowerCase()] != undefined) {
            let time = Date.now();
            let date = new Date(time);
            let p = [...prices];
            let t = [...times];
            if(time >= minute || first){
                setMinute(new Date(Math.ceil(time / 300000) * 300000))
                p.push(lastPrice[props.name.toLowerCase()])
                setPrices(p)
                date = (first) ? date : minute;
                t.push(date.toLocaleString())
                setTimes(t);
            }
            else{
                p[p.length-1] = lastPrice[props.name.toLowerCase()]
                setPrices(p)
                t[t.length-1] = date.toLocaleString();
                setTimes(t);
            }
            console.log(prices)

        }
        setChartData({
            labels: times,
            datasets: [
                {
                    label: `${props.name}-USD`,
                    data: prices
                }
            ]
        });
    }, [lastPrice[props.name.toLowerCase()]])


    const options = {
        responsive: true,
        tooltips: {
            enabled: true
        },
        title: { text: "we hoping out here", display: true },
        scales: {
            yAxes: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                }
            }
        },
        animation: false,
        pointBorderColor: "rgba(0, 0, 0, 0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderColor: "rgba(0, 0, 0, 0.6)",
        borderWidth: 2
    }
    return(

        <Line
            data={chartData}
            options={options}
        />
    )
}
export default WSChart;

/*
start getting socket values into an array
attach timestamps to each value 
update chart at every minute interval
figure out if socket provides values regularly enough
to catch a value at every minute interval

or can set a timer that goes off at every even minute
at that minute i can then grab the last value of the prices 
array and solidify that as the value that will go into the chart


need to be able to update the chart in realtime with the socket

need values that are not part of the even minute values to be
changed
ideally the chart will be running off a dataset that has a 
group of values where the last value changes with each ws change
and increases by length one every minute with the most recent value


I think i need to call the component for the socket in the component
for the chart so that the socket will render first
*/
