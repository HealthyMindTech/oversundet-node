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


const mdTheme = createTheme();

function App() {
  const [data, setData] = React.useState({
    'Elsinore': [2, 9, 3, 5, 0, 3],
    'Helsingborg': [2, 9, 2, 0, 2, 3],
  });
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
                <Box style={{position: 'absolute', left: '61%', top: '11%'}}>
                  <DataPlot data={data} name={'Helsingborg'}/>
                </Box>
                <Box style={{position: 'absolute', left: '14%', top: '11%'}}>
                  <DataPlot data={data} name={'Elsinore'}/>
                </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
    </div>
  );
}


export default App;
