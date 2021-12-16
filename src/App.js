import * as React from 'react';
import pcb_image from './pcb.png';
import './App.css';
import { Button, IconButton} from '@mui/material/';
import { Card, CardMedia, CardActionArea, Grid } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import SignalWifiConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiConnectedNoInternet4';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Input from '@mui/material/Input';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image={pcb_image}
                alt="pcb"
              />
              <Grid container>
                {/* if connected use */}
                {/* <SignalWifiStatusbar4BarIcon fontSize="large" style={{ position: "absolute", top: "5px", right: "5px" }}/> */}
                <IconButton style={{ position: "absolute", top: "5px", right: "5px" }}>
                  <SignalWifiConnectedNoInternet4Icon fontSize="large"/>
                </IconButton>
                <IconButton style={{ position: "absolute", top: "55px", right: "5px" }}>
                  <EmojiEmotionsIcon fontSize="large"/>
                </IconButton>
                <IconButton style={{ position: "absolute", top: "105px", right: "5px" }}>
                  <HelpIcon fontSize="large"/>
                </IconButton>
              </Grid>
            </CardActionArea>
          </Card>
      </header>
    </div>
  );
}

export default App;
