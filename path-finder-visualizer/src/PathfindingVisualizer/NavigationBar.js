import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core';
export default function NavigationBar() {
    return(
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Pathfinding Visualizer Tool
          </Typography>
        </Toolbar>
      </AppBar>  
    )
}