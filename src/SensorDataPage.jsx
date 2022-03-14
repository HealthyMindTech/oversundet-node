import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, FormControl, Select, TextField, MenuItem, Button, Box, Typography } from '@mui/material';
import SensorDataPlot from './SensorDataPlot';
import constants from './constants';
import { GithubPicker } from 'react-color';

export default function SensorDataPage() {
  const { urlDeviceId } = useParams();
  const [deviceId, setDeviceId] = useState(urlDeviceId);
  const [granularity, setGranularity] = useState(constants.GRANULARITY[0].value);
  const [refresh, setRefresh] = useState(0);

  const colorChanged = (color) => {
    const rgb = color.rgb;
    const message = {
      "red": rgb.r,
      "green": rgb.g,
      "blue": rgb.b,
      "light_time": 800,
      "pause_time": 200,
      
    };

    const queryDevice = encodeURIComponent(deviceId);
    const jsonMessage = encodeURIComponent(JSON.stringify(message));
    fetch(
      `${constants.ONESENSOR_POST_MESSAGE_URL}?device=${queryDevice}&message=${jsonMessage}`,
      { method: 'POST' }
    );
  };
  return (
    <Box
      sx={{ width: 'auto', m: 3 }}
      role="presentation"
    >
      <Grid container spacing={10} justifyContent="center">
        <Grid item lg={8} md={10} xs={12}>
          <Paper variant="outlined" style={{padding: 20}}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Your Device
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
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
            <Grid container spacing={3}>
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
                      <SensorDataPlot
                        measurements={measurements}
                        granularity={constants.GRANULARITY.find(option => option.value === granularity)}
                        deviceId={deviceId}
                        refresh={refresh}
                      />
                    </Paper>
                  </Grid>
                )
              })}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
