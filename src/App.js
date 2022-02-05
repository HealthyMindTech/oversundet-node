import * as React from 'react';
// import pcb_image from './pcb.png';
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
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';


// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWFydGluYmFzdGUiLCJhIjoiY2t6MWRraWh5MWt5ejMwbXhiM2JzbWNtOSJ9.j69n_qQHAAGjnu5luRL8yw';

const drawerWidth = 240;

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [
  {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
];


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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const mdTheme = createTheme();

function App() {
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
        <Drawer variant="permanent" open={false}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={() => {}}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
        </Drawer>
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
{/*         
          <Card>
            <CardActionArea>
            </CardActionArea>
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

              <Box sx={{ borderColor: 'primary.main' }}>
                <Typography variant="h1" style={{ transform: 'rotate(90deg)', position: "absolute", top: "60%", right: "-40%", fontWeight: "bold"}} >
                  Oversundet
                </Typography>
              </Box>

            </Box>

             <SignalWifiStatusbar4BarIcon fontSize="large" style={{ position: "absolute", top: "5px", right: "5px" }}/> 

          </Card> */}
    </div>
  );
}


export default App;
