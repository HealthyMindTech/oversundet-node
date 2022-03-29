import * as React from 'react';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function DataPlot(props) {
  const { data, name, selectedTimestamp } = props;

  // const plotData = {
  //   labels: ['Temp', 'Humidity', 'Sound', 'Particles', 'News', 'Mood'],
  //   datasets: [
  //     {
  //       label: name,
  //       data: data[name][selectedTimestamp],
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgba(255, 99, 132, 1)',
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  return (
    <Card style={{
        width: '300px', 
        height: '300px', 
        backgroundColor: 'rgba(255, 255, 255, 1)', 
      }}>
      <CardContent>
        <Typography variant="h6" gutterBottom textAlign="center">
          {name}
        </Typography>

        <svg width="250" height="175" viewBox="0 0 1920 1109" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="1108.45" height="1920" transform="translate(1920) rotate(90)" fill="white"/>
          <rect x="-1.7998" width="1921.8" height="220.937" fill="url(#paint0_linear_237_1649)"/>
          <rect x="-1.7998" y="220.937" width="1921.8" height="220.937" fill="url(#paint1_linear_237_1649)"/>
          <rect x="-1.7998" y="441.874" width="1921.8" height="224.444" fill="url(#paint2_linear_237_1649)"/>
          <rect x="-1.7998" y="665.237" width="1921.8" height="221.746" fill="url(#paint3_linear_237_1649)"/>
          <rect x="-1.7998" y="887.253" width="1921.8" height="220.937" fill="url(#paint4_linear_237_1649)"/>
          {data[name][selectedTimestamp].map((value, index) => {
          // const min = 0;
          // const max = 10;
          // Generate random float for now, from 2 to 7
          const range = Math.random() * 5 + 2;
          const interval = [value - range/2, value + range/2];
          return <>
            <rect 
              key={`${index}-1`} 
              x="-1.7998" 
              y={index * 220.937 - 1} 
              width={1921.8 * (interval[0]/10)} 
              height="228.937" 
              style={{transition: 'all 1s linear 0s'}}
              fill="white"/>
            <rect 
              key={`${index}-2`} 
              x={-1.7998 + (1921.8 * (interval[1]/10))}
              y={index * 220.937 - 1} 
              width={1921.8 * ((10-interval[1])/10)} 
              style={{transition: 'all 1s linear 0s'}}
              height="228.937" 
              fill="white"/>
            </> 
          })}
          <defs>
          <linearGradient id="paint0_linear_237_1649" x1="-1.79981" y1="110.467" x2="1920" y2="110.469" gradientUnits="userSpaceOnUse">
          <stop stop-color="#ECCAE9"/>
          <stop offset="1" stop-color="#93EFF1"/>
          </linearGradient>
          <linearGradient id="paint1_linear_237_1649" x1="-1.7998" y1="331.405" x2="1920" y2="331.405" gradientUnits="userSpaceOnUse">
          <stop stop-color="#DF3563"/>
          <stop offset="1" stop-color="#E7F08E"/>
          </linearGradient>
          <linearGradient id="paint2_linear_237_1649" x1="-1.7998" y1="554.096" x2="1920" y2="554.094" gradientUnits="userSpaceOnUse">
          <stop stop-color="#93EFF4"/>
          <stop offset="1" stop-color="#193B56"/>
          </linearGradient>
          <linearGradient id="paint3_linear_237_1649" x1="-1.7998" y1="776.11" x2="1920" y2="776.11" gradientUnits="userSpaceOnUse">
          <stop stop-color="#55BB8D"/>
          <stop offset="1" stop-color="#EFDDC5"/>
          </linearGradient>
          <linearGradient id="paint4_linear_237_1649" x1="-1.7998" y1="997.721" x2="1920" y2="997.721" gradientUnits="userSpaceOnUse">
          <stop stop-color="#323AE9"/>
          <stop offset="1" stop-color="#DD38C5"/>
          </linearGradient>
          </defs>
          </svg>

      </CardContent>
    </Card>
  );
}
