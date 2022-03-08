import React from 'react';
import map_image from './map.png';
import logo from './logo.gif';
import { Container, Box, Typography } from '@mui/material';
import { Link } from "react-router-dom";

export default function HomePage() {
  return <Box
           role="presentation"
           style={{
            height: '100%',
            backgroundImage: `url("${map_image}")`, 
            position: 'relative', 
            backgroundRepeatY: 'space',
            backgroundSize: '184%',
            backgroundPositionX: '-820px',
            backgroundPositionY: '-549px',
          }}
         >
           <Container>
            <br></br>
            <br></br>
          
            <img src={logo} alt="loading..." width="80%"/>

            <br></br>
            <br></br>

            <Typography component="p" variant="p" textAlign="center" style={{ color: 'white'}}>
              Welcome to the Extended Senses project. 
            </Typography> 

            <br></br>
            <br></br>

            <Typography component="p" variant="p" textAlign="center" style={{ color: 'white'}}>
              <Link to="/data"><button textAlign="center">VIEW DATA</button></Link>
            
            </Typography> 
           </Container>
         </Box>;
}
