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
      fromTime: moment().subtract(moment.duration(granularity) * 60).utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
      toTime: moment().utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
    };
    const url = new URL(constants.ONESENSOR_DATA_URL);
    url.search = new URLSearchParams(parameters).toString();
    
    return fetch(url).then(
      response => response.json()
    ).then((series) => {
      
      return series.timestamps.map((timestamp, idx) => {
        return {
          timestamp: timestamp,
          [measurement.name]: series.values[idx]
        };
      });
    });
  });
  
  return Promise.all(promises).then(data => {
    const res = [];
    if (data.length === 0) {
      return res;
    }
      
    for (let idx = 0; idx < data[0].length; idx++) {
      res.push(Object.assign({}, ...data.map(datum => datum[idx])));
    }
    return res;
  }).catch(error => {
    console.log(error);
  });
}

export default function SensorDataPlot (props) {
  const { measurements, granularity, deviceId, refresh } = props;
  const { subMeasurements } = measurements;

  const [data, setData] = useState([]);
  
  useEffect(() => {
    let timer;
    // Keep a cancel token to ensure that we don't update the view if timer is activated just before
    // we are removed, but are removed at the time that all requests have come in.
    let cancelToken = {};
    const refreshFunc = () => {
      if(cancelToken.cancelled) {
        return;
      }
      refreshAll(deviceId, subMeasurements, granularity.value).then((data) => {
        if (cancelToken.cancelled) {
          return;
        }
        setData(data);
      });
      timer = setTimeout(refreshFunc, 10000);
    };

    refreshFunc();
    return () => {
      cancelToken.cancelled = true;
      if (timer) {
        clearTimeout(timer);
      }
    }
  }, [granularity, deviceId, subMeasurements, refresh]);
  
  return (
    <Chart
      data={data}
      measurementConfig={measurements}
      measurements={subMeasurements}
      dateFormat={granularity.dateFormat}/>
  )
}
