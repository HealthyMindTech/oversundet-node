import React, { useCallback } from "react";

import { Container, Typography, Box, Button } from '@mui/material';
import map_image from './21.jpg';

import { ButtonGroup } from "@mui/material";


export default function MoodPage() {

  const [statusMsg, setStatusMsg] = React.useState("");
  //const [mood, setMood] = React.useState("happy");

  const onSubmitMood = useCallback((mood) => {
    // Send mood event to server, POST event using fetch
    const url = "https://extendedsenses-api.azure-api.net/oversundet-functions/PostMood";
    const moodEvent = {
      mood,
      city: "other"
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(moodEvent)
    }).then(response => {
      if (response.ok) {
        setStatusMsg("Mood sent successfully");
      } else {
        setStatusMsg("Error sending mood");
      }
    }).catch(error => {
      console.log(error);
      setStatusMsg("Error sending mood");
    });
  }, []);

  return (
    <Box
            style={{
              height: '100%',
              backgroundImage: `url("${map_image}")`, 
              position: 'relative', 
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
            }}>
      <Container align="center" style={{

      }}>


        <br></br>
        <br></br>


        <Typography mb={3} variant="h5" style={{fontWeight: 'bold'}}>Send your mood to Extendes Senses!</Typography>
        <ButtonGroup id="mood-btns" variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => {onSubmitMood('happy')}}>🙂 happy</Button>
          <Button onClick={() => {onSubmitMood('neutral')}}>😐 neutral</Button>
          <Button onClick={() => {onSubmitMood('sad')}}>🙁 sad</Button>
        </ButtonGroup>
        

        <br></br>
        <br></br>

        <Typography variant="subtitle1" style={{fontWeight: 'bold'}}>{statusMsg}</Typography>
          
      </Container>
    </Box>
  );
}
