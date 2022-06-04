import React from 'react';
import { Grid, Container, Box, Typography, Link } from '@mui/material';
import map_image from './21.jpg';

export default function GetDevicePage() {
  return  (<Box
             role="presentation"
             style={{
               height: '100%',
               backgroundImage: `url("${map_image}")`, 
               position: 'relative',
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               overflowY: 'scroll'
             }}
           >
             <Grid container spacing={10} justifyContent="center">
               <Grid item lg={8} md={10} xs={12}>
                 <Container>
                   <Grid container justifyContent="center" alignItems="center" style={{ padding: 16}}>
                     <Grid item xs={8}>
                       <Typography variant="h4"  textAlign="center">
                         Get a sensor
                       </Typography>
                     </Grid>
                   </Grid>
                   <Box width="100%" style={{margin: 20}}/>
                   <Grid container justifyContent="center" alignItems="center" >
                     <Grid item xs={10}>
                       <Typography component="p" variant="p" style={{ margin: 10 }}>
                         If you'd like an environment sensor like the ones being used in this project, 
                         you can contact us at&nbsp;
                         <Link href="mailto:contact@healthymindtech.com?subject=Request for Extended Senses sensor">contact@healthymindtech.com</Link>. 
                       </Typography>
                     </Grid>
                     <Box width="100%" style={{margin: 20}}/>
                     <Grid item xs={10}>
                       <img src="sensor.jpeg" alt="Sensor assembled" height="300px"/>
                     </Grid>
                   </Grid>
                 </Container>
               </Grid>
             </Grid>
           </Box>);

}
