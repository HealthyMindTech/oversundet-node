import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Button variant="contained">Connect</Button>
        </p>
        <Card>
          <CardHeader title="How're you feeling today?" />
          <CardContent>
            <ButtonGroup variant="text" size="large" aria-label="large text button group">
              <Button>😀</Button>
              <Button>😐</Button>
              <Button>😢</Button>
            </ButtonGroup> 
          </CardContent>
        </Card>
        <p>
          <Button variant="contained">Help</Button>
        </p>
      </header>
    </div>
  );
}

export default App;
