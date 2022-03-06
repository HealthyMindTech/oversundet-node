import React, { useEffect, useState } from "react";
import Chart from "./charts/Chart";
import moment from 'moment';
import constants from './constants';

const refreshAll = function(deviceId, subMeasurements, granularity) {
  const promises = subMeasurements.map(measurement => {
    const parameters = {
      device: deviceId,
      measure: measurement.name,
      interval: granularity,
      fromTime: moment().subtract(moment.duration(granularity) * 24).utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
      toTime: moment().utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
    };
    const url = new URL(constants.ONESENSOR_DATA_URL);
    url.search = new URLSearchParams(parameters).toString();
    
    return fetch(url).then(response => response.json());
  });
  
  return Promise.all(promises).then(data => {
    let subMeasurementFormatter = subMeasurements[0].formatter ? subMeasurements[0].formatter : (x) => x;

    // Add first measurement data
    const formattedData = data[0].timestamps.map((timestamp, index) => {
      let dataValue = data[0].values[index];
      dataValue = dataValue === null ? null : subMeasurementFormatter(dataValue);
      return {
        timestamp: new Date(timestamp),
        [subMeasurements[0].name]: dataValue
      }
    });
    // Add the rest, if they exist
    for (let i = 1; i < data.length; i++) {
      subMeasurementFormatter = subMeasurements[i].formatter ? subMeasurements[i].formatter : (value) => value;
      const measurementData = data[i];
      measurementData.values.forEach((value, index) => {
        value = value === null ? null : subMeasurementFormatter(value);
        formattedData[index][subMeasurements[i].name] = value;
      });
    }
    return formattedData;
  }).catch(error => {
    console.log(error);
  });
}

export default function SensorDataPlot (props) {
  const { measurements, granularity, deviceId, refresh } = props;
  const { subMeasurements, label, unit } = measurements;

  const [data, setData] = useState([]);

  // function timeNPeriodsBeforeNow(granularity, numPeriods) {
  //   const now = moment();
  //   const periods = [];
  //   for (let i = 0; i < numPeriods; i++) {
  //     periods.push(now.subtract(granularity, 'seconds').toDate());
  //   }

  
  useEffect(() => {
    refreshAll(deviceId, subMeasurements, granularity).then(setData);
  }, [granularity, deviceId, refresh, subMeasurements]);

  useEffect(() => {
    let timer;
    const refreshFunc = () => {
      refreshAll(deviceId, subMeasurements, granularity).then(setData);
      timer = setTimeout(refreshFunc, 10000);
    };

    timer = setTimeout(refreshFunc, 10000);

    return () => {
      clearTimeout(timer);
    }
  }, [granularity, deviceId, subMeasurements, refresh]);
  
  return (
    <Chart data={data} title={label} unit={unit} measurements={subMeasurements}/>
  )
}
