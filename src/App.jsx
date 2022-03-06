import React from 'react';
import './App.css';
import { Typography, Box } from '@mui/material/';
import CssBaseline from '@mui/material/CssBaseline';
import Map from './Map';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SensorDataPage from './SensorDataPage';

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
  return (
      <div className="App">
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={false}>
              <Toolbar
                sx={{
                  pr: '24px', // keep right padding when drawer closed
                }}
              >
                {/* <IconButton
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
              </IconButton> */}
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Extended Senses
              </Typography>
              {/* <MoodModal open={true}/> */}
              {/* <IconButton color="inherit" onClick={() => {}}>
                <DeveloperBoardIcon />
                <Link to="/device">About</Link>
              </IconButton> */}
              {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
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
            <Router>
              <Routes>
                <Route exact path="/" element={<Map/>} />
                <Route path="/data/:urlDeviceId" element={<SensorDataPage />} />
              </Routes>
            </Router>
          </Box>
      </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
