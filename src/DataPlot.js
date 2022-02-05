import * as React from 'react';

import Box from '@mui/material/Box';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';


ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function DataPlot(props) {

  const data = {
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
    datasets: [
      {
        label: '# of Votes',
        data: [2, 9, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box style={{
        width: '350px', 
        height: '350px', 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        borderRadius:'8px',
        padding: '5px'
      }}>
      <Radar data={data} />
    </Box>
  );
}
