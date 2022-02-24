import React, { useEffect, useState } from "react";
import Chart from "./charts/Chart";
import moment from 'moment';


export default function SensorDataPlot (props) {
  const { measurements, granularity, sensorId, refresh } = props;
  const { subMeasurements, label, unit } = measurements;

  const [data, setData] = useState([]);

  // function timeNPeriodsBeforeNow(granularity, numPeriods) {
  //   const now = moment();
  //   const periods = [];
  //   for (let i = 0; i < numPeriods; i++) {
  //     periods.push(now.subtract(granularity, 'seconds').toDate());
  //   }


  useEffect(() => {
    const promises = subMeasurements.map(measurement => {
      const parameters = {
        device: sensorId,
        measure: measurement.name,
        interval: granularity,
        fromTime: moment().subtract(moment.duration(granularity) * 24).utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        toTime: moment().utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
      };
      const url = new URL('https://oversundet-functions-apim.azure-api.net/oversundet-functions/GetOneSensor');
      url.search = new URLSearchParams(parameters).toString();
    
      return fetch(url)
        .then(response => {
          return response.json();
        })
      });
      Promise.all(promises).then(data => {
        // Add first measurement data
        const formattedData = data[0].timestamps.map((timestamp, index) => {
          return {
            timestamp,
            [subMeasurements[0].name]: data[0].values[index]
          }
        });
        // Add the rest, if they exist
        for (let i = 1; i < data.length; i++) {
          const measurementData = data[i];
          measurementData.values.forEach((value, index) => {
            formattedData[index][subMeasurements[i].name] = value;
          });
        }
        setData(formattedData)
      })
      .catch(error => {
        console.log(error);
      });
    }, [granularity, sensorId, refresh]);
  return (
    <Chart data={data} title={label} unit={unit} measurements={subMeasurements}/>
  )
}