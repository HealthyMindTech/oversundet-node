import React from 'react';
import { Grid, Container, Box, Typography, Link } from '@mui/material';
import ReactPlayer from 'react-player/lazy'
import map_image from './21.jpg';

export default function SupportPage() {
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
                         Help
                       </Typography>
                     </Grid>
                   </Grid>
                   <Box width="100%" style={{margin: 20}}/>
                   <Grid container justifyContent="center">
                     <Grid item xs={10}>
                       <Typography component="p" variant="p" style={{ margin: 10 }}>
                         Welcome to the support page for Extended Senses sensor collection.
                         If you are here we presume you have been given one of our sensors and are looking
                         for assistance.
                       </Typography>
                       <Typography component="p" variant="p" style={{margin: 10}}>
                         First and foremost we invite you to our Discord channel:&nbsp;
                         <Link color="inherit" href="https://discord.gg/uSFYNESFke" target="_blank">
                           https://discord.gg/uSFYNESFke
                         </Link>
                       </Typography>
                       <Typography variant="p" component="p" style={{margin: 10}}>
                         You are always welcome to ask about anything with the sensor. We usually answer very fast.
                       </Typography>
                     </Grid>
                     
                     
                     <Box width="100%" style={{margin: 20}}/>
                     
                     <Grid item xs={12}>
                       <Typography variant="h5" textAlign="center">
                         Assembly and Setup Guide
                       </Typography>
                     </Grid>
                     
                     <Box width="100%" style={{margin: 20}}/>
                     
                     <Grid item xs={10}>
                       <Typography component="p" variant="p" style={{ margin: 10 }}>
                         A digital copy of the instruction sheet for assembly and setup
                         can be found here:
                         <Link target="_blank" style={{ margin: 5 }} color="inherit"
                               href="instruction_guide.pdf">Instructions for assembly and setup</Link>
                       </Typography>
                     </Grid>
                     <Box width="100%" style={{margin: 10}}/>
                     <Grid item xs={2}>
                       <img src="assembly_overview_p1.png" alt="Sensor assembly kit" height="150px"/>
                     </Grid>
                     <Grid item xs={2}>
                       <img src="assembly_overview_p2.png" alt="Sensor assembly kit" height="150px"/>
                     </Grid>
                     <Box width="100%" style={{margin: 10}}/>
                     <Grid item xs={10}>
                       <Typography component="p" variant="p" style={{ margin: 10 }}>
                         Your kit might include an antenna, but not all models of the sensors require one. If you have
                         an antenna, then note that the antenna that came into your kit might look a bit different than the one in the assembly instructions. 
                         The asembly instructions are the same nevertheless. 
                       </Typography>
                     </Grid>
                     <Box width="100%" style={{margin: 10}}/>
                     <Grid item xs={10}>
                       <Typography component="p" variant="p" style={{ margin: 10 }}>
                         The 3d printed scaffold that came in the kit might differ. In the videos below you will see some examples
                         and instructions on how to assemble. 
                       </Typography>
                     </Grid>
                     
                     
                     <Box width="100%" style={{margin: 20}}/>
                     
                     <Grid item xs={12}>
                       <Typography variant="h5" textAlign="center">
                         Instruction Videos
                       </Typography>
                     </Grid>
                     <Box width="100%" style={{margin: 20}}/>
                     
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
                         Adding the antenna
                       </Typography>
                     </Grid>
                     <Grid item xs={8}>
                       <ReactPlayer url="https://youtu.be/gPcl6khKbcY" controls={true}
                                    width="100%"
                                    style={{ margin: 10}}/>
                     </Grid>
                     <Grid item xs={1} />


                     <Grid item xs={1}></Grid>
                     <Grid item xs={2}>
                       <Typography component="h6" variant="h6" style={{ margin: 10}}>
                         Add to scaffold (round type)
                       </Typography>
                     </Grid>
                     <Grid item xs={8}>
                       <ReactPlayer url="https://youtu.be/MAGZStrlJF4" controls={true}
                                    width="100%"
                                    style={{ margin: 10}}/>
                     </Grid>
                     <Grid item xs={1} />
                     

                     <Grid item xs={1}></Grid>
                     <Grid item xs={2}>
                       <Typography component="h6" variant="h6" style={{ margin: 10}}>
                         Add to scaffold (blocky type)
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
                         WiFi Connection
                       </Typography>
                     </Grid>
                     <Grid item xs={8}>
                       <ReactPlayer url="https://youtu.be/kbP1EHTo_UA" controls={true}
                                    width="100%"
                                    style={{ margin: 10}}/>
                     </Grid>
                     <Grid item xs={1} />
                     
                     <Grid item xs={1}></Grid>
                     <Grid item xs={2}>
                       <Typography component="h6" variant="h6" style={{ margin: 10}}>
                         Viewing Device Data
                       </Typography>
                     </Grid>
                     <Grid item xs={8}>
                       <ReactPlayer url="https://youtu.be/PbWkxmDs-Ow" controls={true}
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

                     <Grid item xs={1}></Grid>
                     <Grid item xs={2}>
                       <Typography component="h6" variant="h6" style={{ margin: 10}}>
                         Placement outdoors
                       </Typography>
                     </Grid>
                     <Grid item xs={8}>
                       <ReactPlayer url="https://youtu.be/p7mSGZBgEac" controls={true}
                                    width="100%"
                                    style={{ margin: 10}}/>
                     </Grid>
                     <Grid item xs={1} />


                     <Box width="100%" style={{margin: 20}}/>

                     <Grid item xs={12}>
                       <Typography variant="h5" textAlign="center">
                         Frequently Asked Questions
                       </Typography>
                     </Grid>

                     <Grid item xs={10}>
                       <Typography component="p" variant="p" style={{ margin: 10 }}>
                         <b>Q: I can't connect to my WiFi </b> <br></br>
                           A: If you're trying to connect to your own WiFi, 
                           then ensure that the 2.4 GHz connection is enabled as well. The board 
                           uses the 2.4 GHz wireless band for connection. The same applies when 
                           connecting to a private hotspot - ensure that you have Compatibility Mode enabled
                           on an iOS device. 
                         </Typography>
                       </Grid>

                     <Grid item xs={10}>
                       <Typography component="p" variant="p" style={{ margin: 10 }}>
                         <b>Q: I can't connect to the public WiFi</b> <br></br>
                         A: Connecting to public WiFi is often a challenge due to instability and very
                         strict security requirements. 
                       </Typography>
                     </Grid>

                     <Grid item xs={10}>
                       <Typography component="p" variant="p" style={{ margin: 10 }}>
                         <b>Q: Some components get quite hot </b><br></br>
                         A: This is often an indicator that something is not wired correctly. 
                         It is not dangerous. Check again 
                         the connections in the assembly guideline and if nothing looks out of the 
                         ordinary, disconnect and connect again the sensors. 
                       </Typography>
                     </Grid>

                     <Grid item xs={10}>
                       <Typography component="p" variant="p" style={{ margin: 10 }}>
                         <b> Q: The LED blinks blue</b> <br></br>
                         A: That is likely a sign that the LED has been connected the other way around. 
                         Disconnect, turn it, and connect it again. The type of blinking you should be
                         seeing is red and green. 
                       </Typography>
                     </Grid>

                     <Grid item xs={10}>
                       <Typography component="p" variant="p" style={{ margin: 10 }}>
                         <b>Q: What do the different blinking colors mean?</b> <br></br>
                         A: If your LED is blinking red, then it's signaling that it is trying to connect to
                         the WiFi. When it's signaling green, it means it has acquired a WiFi connection. 
                         If it's blinking purple, it's ready to receive new WiFi information. If it's 
                         blinking blue, it's likely because the LED has to be connected the other way around.  
                       </Typography>
                     </Grid>

                     <Grid item xs={10}>
                       <Typography component="p" variant="p" style={{ margin: 10 }}>
                         <b>Q: I have a question that is not answered here</b> <br></br>
                         A: Join our Discord channel and ask for support over there.&nbsp;
                         <Link color="inherit" href="https://discord.gg/uSFYNESFke" target="_blank">
                           https://discord.gg/uSFYNESFke
                         </Link>
                       </Typography>
                     </Grid>


                     <Box width="100%" style={{margin: 20}}/>

                     <Grid item xs={12}>
                       <Typography variant="h5" textAlign="center">
                         3D Printable parts
                       </Typography>
                     </Grid>

                     <Box width="100%" style={{margin: 20}}/>

                     <Grid item xs={10}>
                       <Typography component="p" variant="p" style={{margin: 10}}>
                         Bee hive enclosure:&nbsp;
                         <Link color="inherit" href="https://www.thingiverse.com/thing:5276204" target="_blank">
                           https://www.thingiverse.com/thing:5276204
                         </Link>
                       </Typography>

                       <Typography component="p" variant="p" style={{margin: 10}}>
                         Round Casing:&nbsp;
                         <Link color="inherit" href="https://www.thingiverse.com/thing:5276189" target="_blank">
                           https://www.thingiverse.com/thing:5276189
                         </Link>
                       </Typography>

                       <Typography component="p" variant="p" style={{margin: 10}}>
                         Blocky Enclosure:&nbsp;
                         <Link color="inherit" href="hhttps://www.thingiverse.com/thing:5212085" target="_blank">
                           https://www.thingiverse.com/thing:5212085
                         </Link>
                       </Typography>

                       <Typography component="p" variant="p" style={{margin: 10}}>
                         H22 Blocky Enclosure:&nbsp;
                         <Link color="inherit" href="https://www.thingiverse.com/thing:5278318" target="_blank">
                           https://www.thingiverse.com/thing:5278318
                         </Link>
                       </Typography>
                       
                       <Typography component="p" variant="p" style={{margin: 10}}>
                         Rabbit enclosure:&nbsp;
                         <Link color="inherit" href="https://www.thingiverse.com/thing:5402574" target="_blank">
                         https://www.thingiverse.com/thing:5402574
                         </Link>
                       </Typography>
                       
                     </Grid>


                   </Grid>
                 </Container>
               </Grid>
             </Grid>
           </Box>);

}
