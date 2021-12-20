import * as React from 'react';
import pcb_image from './pcb.png';
import './App.css';
import { IconButton } from '@mui/material/';
import { Card, CardMedia, CardActionArea, Grid } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import SignalWifiConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiConnectedNoInternet4';
// import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import { Box, Link } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Card>
            <CardActionArea>
            </CardActionArea>
              <Grid container direction="row" spacing={2}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                      component="img"
                      image={pcb_image}
                      alt="pcb"
                  />
      
                  <IconButton style={{ position: "absolute", top: "3%", right: "3%" }}>
                    <SignalWifiConnectedNoInternet4Icon fontSize="large"/>
                  </IconButton>
                  <Link href="/">
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: "0.5%",
                        left: "30%",
                        width: "30%",
                        height: "4.8%",
                        border: '1px solid #F00',
                        bgcolor: 'rgba(0, 0, 0, 0.54)',
                        color: 'white',
                        padding: '10px',
                      }}
                    >
                    </Box>
                  </Link>
                  
                  <IconButton style={{ position: "absolute", top: "10%", right: "3%" }}
                    tooltip="How are ya?">
                    <EmojiEmotionsIcon fontSize="large"/>
                  </IconButton>

                  <Link href="/">
                    <Box label="😀"
                      sx={{
                        position: 'absolute',
                        top: "32.5%",
                        left: "31%",
                        width: "4.5%",
                        height: "9%",
                        border: '1px solid #F00',
                        bgcolor: 'rgba(0, 0, 0, 0.54)',
                        color: 'white',
                        padding: '10px',
                      }}
                    >
                    </Box>
                  </Link>
                  
                  <Link href="/">
                    <Box label="😐"
                      sx={{
                        position: 'absolute',
                        top: "32.5%",
                        left: "41.8%",
                        width: "4.5%",
                        height: "9%",
                        border: '1px solid #F00',
                        bgcolor: 'rgba(0, 0, 0, 0.54)',
                        color: 'white',
                        padding: '10px',
                      }}
                    >
                    </Box>
                  </Link>

                  <Link href="/">
                    <Box label="😥"
                      sx={{
                        position: 'absolute',
                        top: "32.5%",
                        left: "52.6%",
                        width: "4.5%",
                        height: "9%",
                        border: '1px solid #F00',
                        bgcolor: 'rgba(0, 0, 0, 0.54)',
                        color: 'white',
                        padding: '10px',
                      }}
                    >
                    </Box>
                  </Link>

                  <Link href="https://discord.gg/45cjemQa">
                    <IconButton style={{ position: "absolute", top: "17%", right: "3%" }}
                      tooltip="Questions?">
                      <HelpIcon fontSize="large"/>
                    </IconButton>
                  </Link>
                </Box>
                {/* if connected use */}
                {/* <SignalWifiStatusbar4BarIcon fontSize="large" style={{ position: "absolute", top: "5px", right: "5px" }}/> */}
                

              </Grid>

            

          </Card>
      </header>
    </div>
  );
}


export default App;
