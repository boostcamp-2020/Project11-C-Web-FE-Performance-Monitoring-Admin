import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SortButton from './SortButton';
import SearchButton from './SearchButton';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    marginBottom: '1rem',
    backgroundColor: 'rgba(30,30,40,0.3)',
  },
  issueCount: {
    gridColumnEnd: 'span 5',
    marginLeft: '1.2rem',
    marginTop: '1.2rem',
    marginBottom: '1rem',
    color: 'white',
    fontSize: '1.2rem',
  },
  projects: {
    gridColumnEnd: 'span 3',
    margin: '0 auto',
    marginTop: '1.2rem',
    marginBottom: '1rem',
    color: 'white',
    fontSize: '1.2rem',
  },
  column: {
    gridColumnEnd: 'span 2',
    margin: '0 auto',
    marginTop: '1rem',
    marginBottom: '1rem',
    color: 'white',
    fontSize: '1.2rem',
  },
}));

const Filter = props => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.issueCount}>Issues ({props.eventNum})</div>
      <div className={classes.projects}>Project Name</div>
      <div className={classes.column}>
        <SortButton />
      </div>
      <div className={classes.column}>
        <SearchButton />
      </div>
    </div>
  );
};

export default Filter;
