import React, { useCallback } from "react";

import { Container, Typography } from '@mui/material';

import { ButtonGroup } from "@mui/material";
import Button from '@mui/material/Button';


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

    <Container align="center">
      <br></br>
      <br></br>
    
      <Typography mb={3} variant="h6">Send your mood to Extendes Senses!</Typography>
      <ButtonGroup id="mood-btns" variant="outlined" aria-label="outlined primary button group">
        <Button onClick={() => {onSubmitMood('happy')}}>🙂 happy</Button>
        <Button onClick={() => {onSubmitMood('neutral')}}>😐 neutral</Button>
        <Button onClick={() => {onSubmitMood('sad')}}>🙁 sad</Button>
      </ButtonGroup>
      

      <br></br>
      <br></br>

      <Typography variant="subtitle1">{statusMsg}</Typography>
        
    </Container>
  );
}
