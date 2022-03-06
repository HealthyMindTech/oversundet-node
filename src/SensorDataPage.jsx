import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { Grid, Paper, FormControl, Select, TextField, MenuItem, Button } from '@mui/material';
import SensorDataPlot from './SensorDataPlot';
import constants from './constants';

const useStyles = makeStyles((theme) => ({
}));


export default function SensorDataPage() {
  const { urlDeviceId } = useParams();
  const classes = useStyles()
  const [deviceId, setDeviceId] = useState(urlDeviceId);
  const [granularity, setGranularity] = useState(constants.GRANULARITY[0].value);
  const [refresh, setRefresh] = useState(0);
  return (
    <Box
      sx={{ width: 'auto', m: 3 }}
      role="presentation"
    >
      <Typography variant="h6" gutterBottom>
        Individual Sensor Data
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
      <Grid container spacing={3}>
        {/* Chart */}
        {constants.MEASUREMENTS.map((measurements, index) => {
          return (
            <Grid item xs={12} md={6} lg={4}>
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
    </Box>
  );
}
