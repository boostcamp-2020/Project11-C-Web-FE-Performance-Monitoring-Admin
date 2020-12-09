import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    backgroundColor: 'rgba(189,189,189,0.3)',
  },
  controller: {
    gridColumnEnd: 'span 5',
    textAlign: 'center',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '3rem',
  },
  resolveButton: {
    marginLeft: '1.25rem',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: 'rgba(50,50,50,0.2)',
    textTransform: 'none',
    color: 'white',
  },
  controllerItem: {
    marginLeft: '1.25rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  IssueInfoItem: {
    flex: '1',
    width: '100%',
  },
  graph: {
    gridColumnEnd: 'span 3',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '1rem',
    marginBottom: '1rem',
    color: 'white',
  },
  column: {
    gridColumnEnd: 'span 2',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '1rem',
    marginBottom: '1rem',
    color: 'white',
  },
}));

const TableColumn = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.controller}>
        <input type="checkbox" className={classes.controllerItem} />
        <Button
          variant="contained"
          className={classes.resolveButton}
          startIcon={<DoneIcon />}
          disabled={true}
        >
          Resolve
        </Button>
      </div>
      <div className={classes.graph}>Graph</div>
      <div className={classes.column}>Events</div>
      <div className={classes.column}>Assigned</div>
    </div>
  );
};

export default TableColumn;
