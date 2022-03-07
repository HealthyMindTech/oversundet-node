import React from 'react';
import { Grid, Paper, Box, Typography, Link } from '@mui/material';
import ReactPlayer from 'react-player/lazy'

export default function SupportPage() {
  return <Box
           role="presentation"
         >
           <Grid container spacing={10} justifyContent="center">
             <Grid item lg={8} md={10} xs={12}>
               <Paper variant="outlined" style={{padding: 16}}>
                 <Grid container justifyContent="center" alignItems="center" style={{ padding: 16}}>
                   <Grid item xs={8}>
                     <Typography variant="h4"  textAlign="center">
                       Help
                     </Typography>
                   </Grid>
                 </Grid>
                 <Grid container justifyContent="center">
                   <Grid item xs={1} />
                   <Grid item xs={5}>
                     <Typography component="p" variant="p" style={{ margin: 10 }}>
                       Welcome to the support page for Extended Senses sensor collection.
                       If you are here we presume you have been given one of our sensors and are looking
                       for assistance. First and foremost we invite you to our discord channel:
                     </Typography>
                     <Typography component="p" variant="p" style={{margin: 10}}>
                       <Link href="https://discord.gg/h6W3cBWd" target="_blank">
                         https://discord.gg/VN56WKJr
                       </Link>
                     </Typography>
                     <Typography variant="p" component="p" style={{margin: 10}}>
                       You are always welcome to ask for any problems with the sensor. Here you can find
                        a <Link target="_blank"
                                href="discord_guide.pdf"> guide to our discord.</Link>
                     </Typography>
                   </Grid>
                   <Grid item xs={6}>
                     <img src="assembly_overview.png" alt="Sensor assembly kit"/>
                   </Grid>
                   
                   <Box width="100%" style={{margin: 20}}/>
                   
                   <Grid item xs={1} />
                   <Grid item xs={10}>
                     <Typography component="p" variant="p" style={{ margin: 10 }}>
                       A digital copy of the instruction sheet that was provided to you when you received the sensor,
                       can be found here:
                       <Link target="_blank" style={{ margin: 5 }}
                             href="instruction_guide.pdf">Instructions</Link>
                     </Typography>
                   </Grid>
                   <Grid item xs={1} />
                   
                   <Box width="100%" style={{margin: 20}}/>
                   
                   <Grid item xs={12}>
                     <Typography variant="h5" textAlign="center">
                       Instruction Videos
                     </Typography>
                   </Grid>
                   
                   <Grid item xs={1}></Grid>
                   <Grid item xs={2}>
                     <Typography component="h6" variant="h6" style={{ margin: 10}}>
                       The assembly
                     </Typography>
                   </Grid>
                   <Grid item xs={8}>
                     <ReactPlayer url="https://youtu.be/pP5arDGhMy4" controls={true}
                                  width="100%"
                                  style={{ margin: 10}}/>
                   </Grid>
                   <Grid item xs={1} />


                   <Grid item xs={1}></Grid>
                   <Grid item xs={2}>
                     <Typography component="h6" variant="h6" style={{ margin: 10}}>
                       Add to scaffold
                     </Typography>
                   </Grid>
                   <Grid item xs={8}>
                     <ReactPlayer url="https://youtu.be/7VJ3DxQja5I" controls={true}
                                  width="100%"
                                  style={{ margin: 10}}/>
                   </Grid>
                   <Grid item xs={1} />

                   <Grid item xs={1}></Grid>
                   <Grid item xs={2}>
                     <Typography component="h6" variant="h6" style={{ margin: 10}}>
                       Enclosure box
                     </Typography>
                   </Grid>
                   <Grid item xs={8}>
                     <ReactPlayer url="https://youtu.be/4Ip-fzK8dGU"
                                  width="100%"
                                  controls={true} style={{ margin: 10}}/>
                   </Grid>
                   <Grid item xs={1} />
                 </Grid>
               </Paper>
             </Grid>
           </Grid>
         </Box>;

// https://www.youtube.com/watch?v=pP5arDGhMy4
}
