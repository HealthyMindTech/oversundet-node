import React, { useState, useCallback } from 'react';
import map_image from './21.jpg';
import { Box, Slider, Container, Typography, Grid, IconButton } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
// import DataPlot from './DataPlot';
import LogoPlot from './LogoPlot';

function addHours(date, hours) {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}

  const data = {
    'Helsingør': [
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
export default function MapPage() {

  const [selectedTimestamp, setSelectedTimestamp] = useState(0);
  const [playTimelineTimer, setPlayTimelineTimer] = useState(null);
    
  const handlePlayButtonClick = useCallback(() => {
    if (playTimelineTimer) {
      clearInterval(playTimelineTimer);
      setPlayTimelineTimer(null);
    } else {
      setPlayTimelineTimer(setInterval(() => {
        console.log('playTimelineTimer');
        setSelectedTimestamp(prevTime => prevTime >= data['Helsingør'].length - 1? 0 : prevTime + 1);
      }, 1000));
    }
  }, [playTimelineTimer]);

  const selectedTimestampText = addHours(data.startDateTime , selectedTimestamp).toLocaleString();
  
  return (<Box
            style={{
              height: '100%',
              backgroundImage: `url("${map_image}")`, 
              position: 'relative', 
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
            }}>
            <Container>
              <Slider
                aria-label="Temperature"
                defaultValue={0}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={data['Helsingør'].length - 1}
                onChange={(event, value) => {
                  setSelectedTimestamp(value);
                }}
                value={selectedTimestamp}
              />
              <Typography id="discrete-slider-custom" gutterBottom textAlign="center" style={{color: 'white', fontWeight: 'bold'}}>
                {selectedTimestampText}
              </Typography>
              <IconButton>
                <PlayArrow onClick={handlePlayButtonClick} style={{"color":"white"}}/>
              </IconButton>
            </Container>
            <Grid container style={{justifyContent: 'space-around'}}>
              <Grid item sx={{m : 2}}>
                <LogoPlot data={data} name="Helsingør" selectedTimestamp={selectedTimestamp} />
                {/* <DataPlot data={data} name={'Elsinore'} selectedTimestamp={selectedTimestamp}/> */}
              </Grid>
              <Grid item sx={{m: 2}}>
                <LogoPlot data={data} name={'Helsingborg'} selectedTimestamp={selectedTimestamp} />
                {/* <DataPlot data={data} name={'Helsingborg'} selectedTimestamp={selectedTimestamp}/> */}
              </Grid>
            </Grid>
          </Box>
         );
}
