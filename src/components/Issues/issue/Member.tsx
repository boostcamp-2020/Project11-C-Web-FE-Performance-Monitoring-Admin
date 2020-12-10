import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  userChip: {
    justifyContent: 'left',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '5px',
    marginBottom: '0.2rem',
  },
}));

const Member = props => {
  const classes = useStyles();

  return (
    <Chip
      onClick={props.onClick}
      className={classes.userChip}
      avatar={<Avatar />}
      id={props.name}
      label={props.name}
      variant="outlined"
    />
  );
};

export default Member;
