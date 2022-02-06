import * as React from 'react';
// import pcb_image from './pcb.png';
import map_image from './map.png';
import './App.css';
import { IconButton } from '@mui/material/';
import { Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
// import HelpIcon from '@mui/icons-material/Help';
// import SignalWifiConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiConnectedNoInternet4';
// import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';


import { Box } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Slider from '@mui/material/Slider';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DataPlot from './DataPlot';


const drawerWidth = 240;



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function addHours(date, hours) {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}

const mdTheme = createTheme();

function App() {
  const [data, setData] = React.useState({
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
  });
  const [selectedTimestamp, setSelectedTimestamp] = React.useState(0);

  const selectedTimestampText = addHours(data.startDateTime , selectedTimestamp).toLocaleString();

  if (false) { setData() } // To avoid a warning
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={false}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => {}}
              sx={{
                marginRight: '36px',
                ...(false && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Box
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
        </Box>
      </Box>
    </ThemeProvider>
    </div>
  );
}


export default App;
