import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stick from './Stick';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  graphContainer: {
    display: 'flex',
    flexDirection: 'row',
    gridColumnEnd: 'span 3',
    margin: '0 auto',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
}));

const Graph = props => {
  const classes = useStyles();
  const stickValues = new Array();
  let index = 0;
  for (let num = 0; num < 14; num++) {
    stickValues[num] = 1;
  }
  const errorList = props.errorEvents;
  errorList.forEach(error => {
    const now = moment();
    const issueDate = moment(error.date);
    const dateDiff: number = now.diff(issueDate, 'days');

    if (dateDiff < 15) {
      stickValues[dateDiff]++;
    }
  });

  return (
    <div className={classes.graphContainer}>
      {stickValues.reverse().map(stick => (
        <Stick key={index++} id={stick / 10 + 'rem'} />
      ))}
    </div>
  );
};

export default Graph;
