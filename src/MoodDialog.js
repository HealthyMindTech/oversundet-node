import React from "react";

import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
//import { makeStyles } from '@mui/material/styles';


//const useStyles = makeStyles(theme => ({}));


export default function MoodDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Mood Dialog</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla mattis velit et lacinia. Nulla odio eros, porttitor nec enim in, laoreet dignissim turpis. Aenean laoreet nunc et imperdiet pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce tempor eget velit sit amet consequat. Quisque condimentum sit amet ipsum ac luctus. Nunc ullamcorper quam ligula, et posuere diam cursus in. Aliquam lobortis orci a nibh sollicitudin pellentesque. Donec felis lectus, tristique quis justo tempor, sodales consectetur nulla. Nam porttitor justo feugiat commodo iaculis. Suspendisse in ex a dolor cursus molestie varius a enim. Nullam rutrum facilisis pretium.
          </DialogContentText>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">City</FormLabel>
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
          <Grid container>
            <Grid item md={6}>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button>☺</Button>
                <Button>😐</Button>
                <Button>☹</Button>
              </ButtonGroup>
            </Grid>
            <Grid item md={6}>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button>☺</Button>
                <Button>😐</Button>
                <Button>☹</Button>
              </ButtonGroup>
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Skip</Button>
          <Button variant='contained' onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}