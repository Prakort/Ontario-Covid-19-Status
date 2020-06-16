import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
var parseString = require('xml2js').parseString;


const data2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
function App() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
 
  const fetchData  = async () => {
    setLoading(true)
    try {
      const result = await axios.post('http://127.0.0.1:5000/status');
      if (result.status === 200)
        setData(result.data.records)

      console.log("result", result.data)

      const pastSeven = []
      for ( var i = 0 ; i < 7 ;i++) {
        let date = moment()
        date = date.subtract(i, 'day').format('YYYY-MM-DD')
        pastSeven.push(date)
      }
      var parser = new DOMParser();

      // Use it to turn your xmlString into an XMLDocument
      var xmlDoc = parser.parseFromString(result.data, "application/xml");
      
      var xml = "<root>Hello xml2js!</root>"
      parseString( xmlDoc, function (err, res) {
          console.log('convert to json',res);
      });

      // if (result.data) {
      //   const this_month = '2020-06'
      //   const this_month_data = result.data.records.filter(arr => arr[4].includes(this_month))
      //   console.log("this month only data", this_month_data)
      //   // const flattenData = []
      //   const dateAndCount = {}
      //   pastSeven.forEach( date => {
      //     const count = result.data.records.filter(arr => arr[4].includes(date)).length;
      //     dateAndCount[date] = count
      //   })
      

      
      // }
     


    } catch (err) {
      console.log("error fetching data", err);
    }
    setLoading(false)
  }



  // console.log('past 7 days', pastSeven)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        

        <Line 
          styls={{backgroundColor:"white"}}
          data={data2}
          width={500}
          height={500}
        />

        <button 
          disabled={loading}
          style={{ backgroundColor: 'white', height: 100, width: 100}}
          onClick={() => fetchData()}
        />
      </header>
    </div>
  );
}

export default App;
