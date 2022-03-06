import React, { useState } from 'react';
import map_image from './map.png';
import { Box, Slider, Container, Typography } from '@mui/material';
import DataPlot from './DataPlot';

function addHours(date, hours) {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}

export default function Map() {
  const data = {
    'Elsinore': [
      [1, 3, 9, 7, 9],
      [2, 4, 8, 8, 1],
      [3, 5, 7, 9, 2],
      [4, 6, 6, 1, 3],
      [5, 7, 5, 2, 4],
      [6, 8, 4, 3, 5],
      [7, 9, 3, 4, 6],
      [8, 1, 2, 5, 7],
      [9, 2, 1, 6, 8],
      [1, 3, 9, 7, 9],
      [2, 4, 8, 8, 1],
      [3, 5, 7, 9, 2],
      [4, 6, 6, 1, 3],
      [5, 7, 5, 2, 4],
      [6, 8, 4, 3, 5],
      [7, 9, 3, 4, 6],
      [8, 1, 2, 5, 7],
      [9, 2, 1, 6, 8],
      [1, 3, 9, 7, 9],
      [2, 4, 8, 8, 1],
      [3, 5, 7, 9, 2],
      [4, 6, 6, 1, 3],
      [5, 7, 5, 2, 4],
      [6, 8, 4, 3, 5],
      [7, 9, 3, 4, 6],
      [8, 1, 2, 5, 7],
      [9, 2, 1, 6, 8],
    ],
    'Helsingborg': [
      [1, 3, 9, 7, 9],
      [2, 4, 8, 8, 1],
      [3, 5, 7, 9, 2],
      [4, 6, 6, 1, 3],
      [5, 7, 5, 2, 4],
      [6, 8, 4, 3, 5],
      [7, 9, 3, 4, 6],
      [8, 1, 2, 5, 7],
      [9, 2, 1, 6, 8],
      [1, 3, 9, 7, 9],
      [2, 4, 8, 8, 1],
      [3, 5, 7, 9, 2],
      [4, 6, 6, 1, 3],
      [5, 7, 5, 2, 4],
      [6, 8, 4, 3, 5],
      [7, 9, 3, 4, 6],
      [8, 1, 2, 5, 7],
      [9, 2, 1, 6, 8],
      [1, 3, 9, 7, 9],
      [2, 4, 8, 8, 1],
      [3, 5, 7, 9, 2],
      [4, 6, 6, 1, 3],
      [5, 7, 5, 2, 4],
      [6, 8, 4, 3, 5],
      [7, 9, 3, 4, 6],
      [8, 1, 2, 5, 7],
      [9, 2, 1, 6, 8],
    ],
    // Start datetime is March 1st, 2022, midnight
    startDateTime: new Date(2022, 2, 1, 0, 0, 0, 0),
  };
  const [selectedTimestamp, setSelectedTimestamp] = useState(0);

  const selectedTimestampText = addHours(data.startDateTime , selectedTimestamp).toLocaleString();
  
  return (<Box
            style={{
              height: '100%',
              backgroundImage: `url("${map_image}")`, 
              position: 'relative', 
              backgroundRepeatY: 'no-repeat',
              backgroundSize: '184%',
              backgroundPositionX: '-820px',
              backgroundPositionY: '-549px',
            }}>
            <Container>
              <Slider
                aria-label="Temperature"
                defaultValue={0}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={data['Elsinore'].length - 1}
                onChange={(event, value) => {
                  setSelectedTimestamp(value);
                }}
                value={selectedTimestamp}
              />
              <Typography id="discrete-slider-custom" gutterBottom style={{color: 'white', fontWeight: 'bold'}}>
                {selectedTimestampText}
              </Typography>
            </Container>
            <Box style={{position: 'absolute', left: '61%', top: '11%'}}>
              <DataPlot data={data} name={'Helsingborg'} selectedTimestamp={selectedTimestamp}/>
            </Box>
            <Box style={{position: 'absolute', left: '14%', top: '11%'}}>
              <DataPlot data={data} name={'Elsinore'} selectedTimestamp={selectedTimestamp}/>
            </Box>
          </Box>
         );
}
