import React, { useContext } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { IssuesDispatchContext } from '../../../context/IssuesProvider';
import { UserStateContext } from '../../../context/UserProvider';

const options = ['Resolved', 'Unresolved', 'All'];

const useStyles = makeStyles(theme => ({
  sortButton: {
    backgroundColor: 'rgba(30,30,40,0.3)',
    color: 'white',
    textTransform: 'none',
  },
  arrowButton: {
    backgroundColor: 'rgba(30,30,40,0.3)',
    color: 'white',
    width: '3rem',
  },
}));

export default function SortButton() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const issuesDispatch = useContext(IssuesDispatchContext);
  const userState = useContext(UserStateContext);

  const filtering = async index => {
    const response: any = await axios.get(
      `${process.env.API_URL}/issue/project/${userState[0]}/${index}`,
      {
        withCredentials: true,
      }
    );

    issuesDispatch({ type: 'set', issues: response.data });
  };

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    filtering(index);
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
          className={classes.sortButton}
        >
          <Button className={classes.sortButton} onClick={handleClick}>
            {options[selectedIndex]}
          </Button>
          <Button
            className={classes.arrowButton}
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 3}
                        selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}
