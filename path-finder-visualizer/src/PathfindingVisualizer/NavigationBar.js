import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
export default function NavigationBar() {
  const classes = useStyles();
    return(
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.text}>
            PATHFINDING VISUALIZER TOOL
          </Typography>
        </Toolbar>
      </AppBar>  
    )
}

const useStyles = makeStyles({
  text: {
    fontWeight: 'bold'
  }
})
