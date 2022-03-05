import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import SensorDataPlots from './SensorDataPlots';
import Typography  from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: { height: '64px'}
}));


export default function TemporaryDrawer() {
  const { deviceId } = useParams();
  const classes = useStyles()

  return (
    <Box
      sx={{ width: 'auto', m: 3 }}
      role="presentation"
    >
      <div className={classes.appBarSpacer} />
      <Typography variant="h6" gutterBottom>
        Individual Sensor Data
      </Typography>
      <SensorDataPlots urlDeviceId={deviceId} />
    </Box>
  );
}
