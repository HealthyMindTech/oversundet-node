import React, { useEffect, useState } from "react";
import Chart from "./charts/Chart";



export default function SensorDataPlot (props) {
  const { measurements } = props;
  const { subMeasurements, label, unit } = measurements;

  const [data, setData] = useState([]);

  useEffect(() => {
    const promises = subMeasurements.map(measurement => {
      const parameters = {
        // device: '',
        measure: measurement.name,
        interval: 'PT1H',
        fromTime: '2022-02-16T00:00:00Z',
        toTime: '2022-02-17T00:00:00Z'
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
            name: timestamp,
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
    }, []);
  console.log(data)
  return (
    <Chart data={data} title={label} unit={unit} measurements={subMeasurements}/>
  )
}