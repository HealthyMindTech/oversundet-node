import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
  const { data, name } = props;

  const plotData = {
    labels: ['Temp', 'Humidity', 'Sound', 'Particles', 'News', 'Mood'],
    datasets: [
      {
        label: name,
        data: data[name],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <Card style={{
        width: '350px', 
        height: '350px', 
        backgroundColor: 'rgba(255, 255, 255, 1)', 
      }}>
      <CardContent>
        <Radar data={plotData} />
      </CardContent>
    </Card>
  );
}
