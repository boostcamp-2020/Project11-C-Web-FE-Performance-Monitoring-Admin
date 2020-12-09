import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles(theme => ({
  openUserListButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    outline: 'none',
    border: 'none',
    boxShadow: 'none',
    padding: '0.5rem',
    paddingLeft: '1rem',
  },
  userIcon: {
    color: 'white',
    marginRight: '0',
  },
  openIcon: {
    color: 'white',
    marginLeft: '0',
  },
  usersContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '10rem',
  },
}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        className={classes.openUserListButton}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <PersonAddIcon className={classes.userIcon} />
        <ArrowDropDownIcon className={classes.openIcon} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.usersContainer}>
          <button>test1</button>
          <button>test1</button>
          <button>test1</button>
        </div>
      </Popover>
    </div>
  );
}
