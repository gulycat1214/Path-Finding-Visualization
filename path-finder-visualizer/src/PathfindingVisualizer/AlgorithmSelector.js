import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


// This React component is the pop-up dialog to explain 
// how to use the dashboard

export default function AlgorithmSelector(props) {
  const [open, setOpen] = React.useState(false);
  const algorithms = ['Dijkstra', 'BFS (Breadth-first search)', 'DFS (Depth-first search)'];

  const { changeAlgorithm, currentAlgorithm } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles({
    button1: {
        margin: '20px',
        backgroundColor: 'red',
        fontWeight: 'bold'
    },
    button2: {
      margin: '10px',
      backgroundColor: 'purple',
      color: 'white',
      fontWeight: 'bold'
  },
  })

  const classes = useStyles();

  return (
    <>
      <Button className={classes.button1} onClick={handleClickOpen}>
        {currentAlgorithm}
        <ArrowDropDownIcon></ArrowDropDownIcon>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"What searching Algorithm do you want to use?"}</DialogTitle>
        <DialogContent>
          {
            algorithms.map((algorithmName, index) => {
              return <Button className={classes.button2} onClick={() => {
                changeAlgorithm(algorithmName);
                handleClose();
              }}>{algorithmName}</Button>
            })
          }
        </DialogContent>
      </Dialog>
    </>
  );
}