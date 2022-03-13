import React, { useCallback } from "react";

import { Container, Typography } from '@mui/material';

import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function MoodPage() {

  const [statusMsg, setStatusMsg] = React.useState("");
  const [mood, setMood] = React.useState("happy");
  const [city, setCity] = React.useState("other");

  const onSubmitMood = useCallback((e) => {
    e.preventDefault();
    // Send mood event to server, POST event using fetch
    const url = "https://extendedsenses-api.azure-api.net/oversundet-functions/PostMood";
    const moodEvent = {
      mood, city
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
  }, [mood, city]);

  return (

    <Container align="center">
      <br></br>
      <br></br>
    
      <FormControl>
        {/* controlled by state */}
        <FormLabel id="demo-row-radio-buttons-group-label">How are you feeling right now?</FormLabel>
        <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={mood}
        onChange={(event) => setMood(event.target.value)}
      >
          <FormControlLabel value="happy" control={<Radio />} label="🙂 happy" />
          <FormControlLabel value="neutral" control={<Radio />} label="😐 neutral" />
          <FormControlLabel value="sad" control={<Radio />} label="🙁 sad" />
        </RadioGroup>
      </FormControl>


      <br></br>
      <br></br>

      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Where are you from?</FormLabel>
        <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      >
          <FormControlLabel value="elsinore" control={<Radio />} label="Elsinore" />
          <FormControlLabel value="helsingborg" control={<Radio />} label="Helsingborg" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      <br></br>
      <br></br>

      <Button variant='contained' onClick={onSubmitMood}>SUBMIT</Button>

      <br></br>
      <br></br>

      <Typography variant="subtitle1">{statusMsg}</Typography>
        
    </Container>
  );
}