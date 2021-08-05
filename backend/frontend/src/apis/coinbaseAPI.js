import CoinbasePro from 'coinbase-pro';
import { useEffect, useState } from 'react';

const publicClient = new CoinbasePro.PublicClient();

// function CoinBaseListings(){}

function CoinBaseProData(props) {
    var data;
    // const CoinBaseData = () => {
    //     let endTime;
    //     let startTime;
        // if(props%1000 == 0){
        //     startTime = props;
        //     endTime = new Date(Number(startTime) + 86400000);
        // }
        // else if((props - Date.now()) < 0){
        //     endTime = new Date()
        //     startTime = new Date(endTime - 86400000);
        // }
    const rates = publicClient.getProductHistoricRates(`${props}-USD`)
    // , {
        // start: startTime.toISOString(),
        // end: endTime.toISOString(),
        // granularity: 300
    // })
    var ratesData = rates.then(dat => {
        let dates = [];
        let prices = [];
        let newData = [];
        for (const obj of dat) {
            let price = parseFloat((obj[1] + obj[2] + obj[3] + obj[4]) / 4)
            let date = new Date(obj[0]*1000);
            date = date.toLocaleString()
            prices.push(price);
            dates.push(date);
        }
        for(var x = 0; x < dat.length; x++){
            newData.push({date:dates[x], price:prices[x]})
        }
        return newData;
    })
    return ratesData;
}
export default CoinBaseProData;
