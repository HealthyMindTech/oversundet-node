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
          <Button variant="contained">Hello World</Button>
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
