import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import SensorDataPlots from './SensorDataPlots';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: { height: '64px'}
}));


export default function TemporaryDrawer() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (open === undefined) {
      setState({ ...state, [anchor]: !state[anchor] });
    } else {
      setState({ ...state, [anchor]: open });
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.appBarSpacer} />
      <SensorDataPlots />
    </Box>
  );

  return (
    <div>
        <React.Fragment key={'top'}>
          <IconButton color="inherit" onClick={toggleDrawer('top')}>
            <DeveloperBoardIcon />
          </IconButton>
          <Drawer
            anchor={'top'}
            open={state['top']}
            onClose={toggleDrawer('top', false)}
          >
            {list('top')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}