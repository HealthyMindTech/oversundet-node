import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy'
import logo from './logo.gif';
import map_image from './21.jpg';
import { Container, Box, Typography, Grid, Alert } from '@mui/material';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const [showMoodMsg, setShowMoodMsg] = useState(searchParams.get('mood') === 'true');

  return <Box
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
           <Container>
            <br></br>
          

            {showMoodMsg && <div>
              <Alert onClick={() => {setShowMoodMsg(false)}} severity="info">Your mood has been sent to Extended Senses!</Alert>
              <br></br>
              <br></br>
              </div>}
            <img src={logo} alt="loading..." width="100%"/>

            <br></br>
            <br></br>

            <Typography component="p" variant="h4" textAlign="center" style={{ color: 'white'}}>
              Welcome to the Extended Senses project
            </Typography> 

            <br></br>
            <ReactPlayer url="https://vimeo.com/699379865/a2e4e7d65b" controls={true}
                        width="100%"
                        style={{ margin: 10}}/>
            
            <br></br>
             <Grid container spacing={2}>
               <Grid item xs={1} />
               <Grid item xs={10}>
                 <Typography component="p" variant="p">
              Extended Senses is an artistic collaboration between one Swedish and one Danish art collective and the two cities Helsingør and Helsingborg. Together they have been exploring how sensors can be implemented in a city through an artistic, collective process providing agency about data and sensors to citizens. The work can be experienced through a light installation exhibited in April at Kulturværftet, Helsingør and in June during the international city expo H22 at Dunkers Kulturhus, Helsingborg and online through the experience of the citizens involved in sensing the cities. Besides providing both cities with an artistic experience we hope to form new connections and understandings of what it means to be a human in relation to nature and the city.
             </Typography>

             <br></br>
               
             <Typography components="title5" variant="h5" component="h5">Distributed Mind</Typography>
             <Typography component="p" variant="p">
               The Danish art collective built a new sensor system for the two cities to be distributed amongst citizens. Through workshops held in March and April they teach citizens how to set up and read the sensors. The citizens are an important part of the work and their experiences are integrated in the work; on a website they describe the experience of gathering the data and learning to listen to and observe the city through an extended sensor system. All of a sudden they are not only experiencing the city and the nature of the city through their existing senses, eyes, ears etc., they are given a new set of sensors to observe and experience with. The citizens take the sensors home and thus they’ll be distributed making the data flow from every corner of the city as a network of thoughts - a distributed mind.
             </Typography>
             <br></br>
             <Typography component="p" variant="p">
               A big thank you to the students at U / Nord HTX and BGK ArtLab in Helsingör and the kids from CoderDojo Helsingborg. Their commitment and engagement to the sensors gives life to the installation and an insight into possible futures.
               </Typography>
               <br/>
               <Typography components="title5" variant="h5" component="h5">
                 How do you feel?
               </Typography>

             <Typography component="p" variant="p">
               The artists are furthermore investigating if there’s a correlation between the data registered by the sensors and how people feel. Our feelings are generally not considered to be valid data, but what happens if you mix the feelings from a city with data collected from nature? What picture will we be able to draw of the collective living in a city?
             </Typography>
             <br/>
             
             <Typography component="p" variant="p">
               You are welcome to add your current state of mind and become part of the artwork and artistic investigation. Please follow the QR-code down below and it will take you to a web application where you can register how you feel and you will be able to see an immediate transformation of the aesthetic appearances of the light installation, when you add your data and become an active part of the emotional system of the city.
             </Typography>
             
             <br />
             
             <Typography components="title5" variant="h5" component="h5">
                 Pulsating heart
             </Typography>
             
             <Typography component="p" variant="p">
               The data from the citizens is streamed live to the central installation created by the Swedish artists where it is translated to pulsating light in bright colors. The light installation will thus constitute the heart of the installation and be an abstract portrait of the city and all the information provided from the sensors. The installation is exhibited in the cultural centers of each city, Kulturværftet and Dunkers Kulturhus, where it can be experienced by citizens and tourists alike. Through the experience of the light installation, we want people to gain an understanding of data and sensors and how this can expand our understanding of our surrounding nature. We want to create an engaging installation that creates a feeling of agency and involvement in relation to data collection and the future city.
             </Typography>
               
             <br />
               
             <Typography components="title5" variant="h5" component="h5">
               Artistic Collaboration
             </Typography>

             <Typography component="p" variant="p">
               The art collectives have been working closely together throughout the project period extending their artistic practices and creative businesses to new levels. The Swedish art collective consists of Johan Gelinder and Emil Berzén. Both have a background in interaction design and are creating aesthetic experiences by building bridges between technology, design and art. Paula Petcu, Troels Nielsen, Martin Basterrechea, Alastair Clewlow and Kim Ng are all a part of Healthy Mind Tech, the Danish art collective. They investigate how digital technology can make people feel better with the combination of art, biology and technology. 
             </Typography>
             <br />
             
             <Typography components="title5" variant="h5" component="h5">
               City Collaboration and Development
             </Typography>

               <Typography component="p" variant="p">
               Helsingør and Helsingborg are two cities aiming to develop the local, creative sector. Both cities experience that entrepreneurs in the cultural sector have difficulties developing new innovative ideas that have the potential to grow and are visible on an international stage. The best ideas are usually only realized at the local level - in this case either in Helsingør or in Helsingborg. The two cities want to provide entrepreneurs in the cultural sector with increased exposure and the experience on how to scale up an idea and a larger network in Denmark and Sweden. Therefore, the two cities have established a partnership to improve the opportunities for artistic innovation and entrepreneurship in the cultural sector – across the strait. Extended Senses is the first result of this collaboration.
             </Typography>
             <br />

             <Typography component="p" variant="p">             
               The project is funded by the HH-collaboration, a common strategy for Helsingør and Helsingborg that wants to develop quality of life and growth in the region around the northern strait of Öresund.
             </Typography>
               </Grid>
             </Grid>
           </Container>
         </Box>;
}
