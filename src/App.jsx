import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Typography, Box, Menu, MenuItem, CssBaseline, 
         Container, IconButton, AppBar, Toolbar} from '@mui/material/';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import SensorDataPage from './SensorDataPage';
import MenuIcon from '@mui/icons-material/Menu';

import MapPage from './MapPage';
import SupportPage from './SupportPage';
import HomePage from './HomePage';
import MoodPage from './MoodPage';

const NavLink = styled(Link)({
  textDecoration: 'none',
  color: 'white'
});


const mdTheme = createTheme({
  palette: {
    danger: {
      main: '#e1526a', //Redish
      darker: '#e1526a',
      contrastText: '#eee'
    }
  },
  typography: {
    fontFamily: "'Space Mono', monospace",
    allVariants: {
      color: '#2a393f'
    }
  },
});


function App() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    return true;
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  return (
    <ThemeProvider theme={mdTheme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="static" style={{backgroundColor: '#2c4f65'}}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <NavLink to="/">
                  <img src="/favicon.png" alt="logo" style={{
                         marginTop: 10,
                         height: 25,
                         marginRight: 30,
                         display: 'inline'
                       }}
                  />
                </NavLink>

                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  style={{marginRight: 20}}
                  sx={{ mr: 2, display: { xs: 'none', sm: 'flex' } }}
                >

                  <NavLink to="/">
                    Extended Senses
                  </NavLink>
                </Typography>
                
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  
                  <Menu
                    id="menu-appbar"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', sm: 'none' },
                    }}
                  >
                    <MenuItem key="support">
                      <Typography textAlign="center">
                        <NavLink to="/mood" onClick={handleCloseNavMenu} style={{ color: 'gray' }}>
                          Mood
                        </NavLink>
                      </Typography>
                    </MenuItem>

                    <MenuItem key="support">
                      <Typography textAlign="center">
                        <NavLink to="/data" onClick={handleCloseNavMenu} style={{ color: 'gray' }}>
                          Data
                        </NavLink>
                      </Typography>
                    </MenuItem>

                    <MenuItem key="your-device">
                      <Typography textAlign="center">
                        <NavLink to="/data/type-here" onClick={handleCloseNavMenu} style={{ color: 'gray' }}>
                          Your Device
                        </NavLink>
                      </Typography>
                    </MenuItem>

                    <MenuItem key="support">
                      <Typography textAlign="center">
                        <NavLink to="/support" onClick={handleCloseNavMenu} style={{ color: 'gray' }}>
                          Support
                        </NavLink>
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>

                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
                >
                </Typography>

                <Typography textAlign="center" sx={{ my: 2, color: 'white', display: { xs: 'none', sm: 'block' }, marginRight: '20px' }}>
                  <NavLink to="/mood">
                    Mood
                  </NavLink>
                </Typography>

                <Typography textAlign="center" sx={{ my: 2, color: 'white', display: { xs: 'none', sm: 'block' }, marginRight: '20px' }}>
                  <NavLink to="/data">
                    Data
                  </NavLink>
                </Typography>

                <Typography textAlign="center" sx={{ my: 2, color: 'white', display: { xs: 'none', sm: 'block' }, marginRight: '20px' }}>
                  <NavLink to="/data/type-here">
                    Your Device
                  </NavLink>
                </Typography>

                <Typography textAlign="center" sx={{ my: 2, color: 'white', display: { xs: 'none', sm: 'block' }, marginRight: '20px' }}>
                  <NavLink to="/support">
                    Support
                  </NavLink>
                </Typography>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
        
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
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/data" element={<MapPage/>} />
            <Route path="/data/:urlDeviceId" element={<SensorDataPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/mood" element={<MoodPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
