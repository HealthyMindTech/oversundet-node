import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, FormControl, Select, TextField, MenuItem, Container,
         Button, Box, Typography } from '@mui/material';
import constants from './constants';
import { GithubPicker } from 'react-color';
import Chart from "./charts/Chart";
import moment from 'moment';
import map_image from './21.jpg';

const refreshAll = function(deviceId, measurements, granularity) {
  const parameters = {
    device: deviceId && deviceId.toLowerCase().trim(),
    measure: measurements.flatMap(m => m.subMeasurements.map(measurement => measurement.name)).join(','),
    interval: granularity,
    fromTime: moment().subtract(moment.duration(granularity) * 60).utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
    toTime: moment().utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
  };
  
  const url = new URL(constants.ONESENSOR_DATA_URL);
  url.search = new URLSearchParams(parameters).toString();
  
  return fetch(url).then(
    response => response.json()
  ).then(data => {
    if (data.length === 0) {
      return [];
    }
    const res = Object.keys(data).map(key => {
      return data[key].map(d => ({ [key]: d }));
    }).reduce((a, b) => a.map((v, i) => Object.assign(v, b[i]))).map(
      (r) => Object.assign(r, { timestamp: new Date(r['timestamps']) })
    );
                          
    return res;
  }).catch(error => {
    console.log(error);
  });
}

export default function SensorDataPage() {
  const { urlDeviceId } = useParams();
  const [deviceId, setDeviceId] = useState(urlDeviceId);
  const [granularity, setGranularity] = useState(constants.GRANULARITY[0].value);
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    let timer;
    // Keep a cancel token to ensure that we don't update the view if timer is activated just before
    // we are removed, but are removed at the time that all requests have come in.
    let cancelToken = {};
    const refreshFunc = () => {
      if(cancelToken.cancelled) {
        return;
      }
      refreshAll(deviceId, constants.MEASUREMENTS, granularity).then((data) => {
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
  }, [granularity, deviceId, refresh]);
  

  const colorChanged = (color) => {
    const rgb = color.rgb;
    const message = {
      "red": rgb.r,
      "green": rgb.g,
      "blue": rgb.b,
      "light_time": 800,
      "pause_time": 200,
      
    };

    let myDeviceId = deviceId && deviceId.toLowerCase().trim();
    const queryDevice = encodeURIComponent(myDeviceId);
    const jsonMessage = encodeURIComponent(JSON.stringify(message));
    fetch(
      `${constants.ONESENSOR_POST_MESSAGE_URL}?device=${queryDevice}&message=${jsonMessage}`,
      { method: 'POST' }
    );
  };

  return (
    <Box
      role="presentation"
      style={{
        height: '100%',
        backgroundImage: `url("${map_image}")`, 
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        overflowY: 'scroll'
      }}
    >
      <Grid container spacing={10} justifyContent="center">
        <Grid item lg={8} md={10} xs={12}>
          <Container style={{padding: 20}}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Your Device
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                {/* Form to enter the sensor ID (free text) and the granularity of the data (dropdown) */}
                <FormControl component="fieldset">
                  <TextField
                    size="small"
                    id="sensor-id"
                    label="Sensor ID"
                    value={deviceId}
                    onChange={(event) => setDeviceId(event.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl component="fieldset">
                  <Select
                    size='small'
                    labelId="granularity-select-label"
                    id="granularity-select"
                    value={granularity}
                    onChange={(event) => setGranularity(event.target.value)}
                  >
                    {constants.GRANULARITY.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                {/* Refresh button */}
                <Button variant="contained" color="primary" onClick={() => setRefresh(refresh + 1)}>
                  Refresh
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Typography style={{marginTop: 5}} variant="subtitle1">
                  Send color to {deviceId}
                </Typography>
                <Box>
                  <GithubPicker
                    width="220px" onChange={colorChanged}
                    colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB']}
                  />
                </Box>
              </Grid>
              
            </Grid>
            <Grid container spacing={3} style={{ marginTop: 8}}>
              {/* Chart */}
              {constants.MEASUREMENTS.map((measurements, index) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 300,
                      }}
                    >
                      <Chart
                        data={data}
                        measurementConfig={measurements}
                        measurements={measurements.subMeasurements}
                        dateFormat={constants.GRANULARITY.find(option => option.value === granularity).dateFormat}
                      />
                    </Paper>
                  </Grid>
                )
              })}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
