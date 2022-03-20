import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Typography, Box, Menu, MenuItem, CssBaseline, 
         Container, IconButton, AppBar, Toolbar, Collapse, Alert } from '@mui/material/';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import SensorDataPage from './SensorDataPage';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import MapPage from './MapPage';
import SupportPage from './SupportPage';
import HomePage from './HomePage';
import MoodPage from './MoodPage';

const NavLink = styled(Link)({
  textDecoration: 'none',
  color: 'white'
});


const mdTheme = createTheme();


function App() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [bannerOpen, setBannerOpen] = useState(true);
  
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
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                  <NavLink to="/">Extended Senses</NavLink>
                </Typography>
                
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                      vertical: 'bottom',
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
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
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
                  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                  <NavLink to="/">
                    Extended Senses
                  </NavLink>
                </Typography>

                <Typography textAlign="center" sx={{ my: 2, color: 'white', display: 'block', marginRight: '12px' }}>
                  <NavLink to="/data">
                    Data
                  </NavLink>
                </Typography>

                <Typography textAlign="center" sx={{ my: 2, color: 'white', display: 'block', marginRight: '12px' }}>
                  <NavLink to="/data/type-here">
                    Your Device
                  </NavLink>
                </Typography>

                <Typography textAlign="center" sx={{ my: 2, color: 'white', display: 'block', marginRight: '12px' }}>
                  <NavLink to="/support">
                    Help
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
          <Collapse in={bannerOpen}>
            <Alert
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setBannerOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              style={{marginBottom: 1}}
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1"> 
                Vigtigt! Hvis der er spørgsmål eller om du ønsker support til, send da en mail til
                <a href="mailto:contact@healthymindtech.com"> contact@healthymindtech.com </a> 
                eller hop ind på&nbsp;
                <a href="https://discord.gg/uSFYNESFke" target="_blank" rel="noreferrer">
                  discord</a> og få hjælp der.
              </Typography>
              <br/>
              <Typography variant="subtitle1"> 
                Viktigt! Om ni har frågor eller önskar support till sensoren, skicka då en mail till
                <a href="mailto:contact@healthymindtech.com"> contact@healthymindtech.com </a> 
                eller hoppa in på&nbsp; 
                <a href="https://discord.gg/uSFYNESFke" target="_blank" rel="noreferrer">
                   discord</a> och få hjälp där.
              </Typography>
            </Alert>
          </Collapse>
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
