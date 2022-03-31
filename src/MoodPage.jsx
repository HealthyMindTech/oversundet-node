import React, { useCallback } from "react";
import { useNavigate } from 'react-router-dom';

import { Container, Typography, Box, Button } from '@mui/material';
import map_image from './21.jpg';
import logo from './logo.gif';

import { ButtonGroup } from "@mui/material";


export default function MoodPage({setMessage}) {
  const navigate = useNavigate();

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
    }).catch(error => {
      console.log(error);
    });

    if (setMessage) {
      setMessage(`Thank you for contributing to extended senses!`);
    }
    navigate("/");

  }, [navigate, setMessage]);

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
      <Container align="center">


        <br></br>
        <br></br>

        <img src={logo} alt="loading..." width="80%"/>

        <br></br>
        <br></br>

        <Typography mb={3} variant="h5" style={{ color: 'black'}}>
          Contribute your mood to Extended Senses!
        </Typography>
        <ButtonGroup id="mood-btns" variant="contained" size="large" aria-label="outlined primary button group">
          <Button color="success" onClick={() => {onSubmitMood('happy')}}>
            <span style={{fontSize: 30}}>
              🙂
            </span>
          </Button>
          <Button color="primary" onClick={() => {onSubmitMood('neutral')}}>
            <span style={{fontSize: 30}}>
              😐
            </span>
          </Button>
          <Button color="error" onClick={() => {onSubmitMood('sad')}}>
            <span style={{fontSize: 30}}>
              🙁
            </span>
          </Button>
        </ButtonGroup>
      </Container>
    </Box>
  );
}
