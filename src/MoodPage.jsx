import React from "react";

import { Container } from '@mui/material';

import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function MoodPage() {
  return (

    <Container align="center">
      <br></br>
      <br></br>
    
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">How are you feeling right now?</FormLabel>
        <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
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
      >
          <FormControlLabel value="elsinore" control={<Radio />} label="Elsinore" />
          <FormControlLabel value="helsingborg" control={<Radio />} label="Helsingborg" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      <br></br>
      <br></br>

      <Button variant='contained' onClick="">SUBMIT</Button>
        
    </Container>
  );
}