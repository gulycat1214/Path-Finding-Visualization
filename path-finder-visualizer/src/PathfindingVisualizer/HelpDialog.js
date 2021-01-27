import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
export default function HelpDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles({
    button1: {
        margin: '20px',
        backgroundColor: 'brown',
        fontWeight: 'bold'
    },
  })

  const classes = useStyles();

  return (
    <>
      <Button className={classes.button1} onClick={handleClickOpen}>
        HOW IT WORKS
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"How does it work?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The purpose of this dashboard is to proof the efficiency of searching algorithms.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            1. Select an initial and target position (green and red squares) by moving them to any place in the grid.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            2. Draw as many walls as you want (obstacles), by clicking and moving the mouse over the white squares.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            3. Press visualize and see the efficiency of the chosen algorithm.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            4. Clear the grid and restart the game!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            I AM READY!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}