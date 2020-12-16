import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import NewReleasesIcon from '@material-ui/icons/NewReleases';
import HelpIcon from '@material-ui/icons/Help';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

const drawerWidth = 240;

const bottomIcons = [<NewReleasesIcon />, <HelpIcon />, <SyncAltIcon />];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    borderRight: '0',
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  listItemIcon: {
    color: 'white',
    paddingLeft: '0.4rem',
  },
  listItemText: {
    color: 'white',
  },
  platformIcon: {
    marginLeft: '-8px',
  },
  selectedPlatform: {
    backgroundColor: 'rgba(200,200,200,0.3)',
  },
  others: {},
}));

const PlatformNav = ({ platform, setPlatform }) => {
  const classes = useStyles();

  const platformClicked = event => {
    // setPlatform('test');
    const target = event.target.closest(`.${classes.others}`);

    if (target) {
      setPlatform(target.title);
    }
  };

  useEffect(() => {
    const target = document.querySelector('.MuiDrawer-paperAnchorDockedLeft');
    target.setAttribute('style', 'border-right: none;');
  }, []);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer} onClick={platformClicked}>
        <List>
          {['Node', 'Express', 'JavaScript', 'React', 'Vue'].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                className={
                  text === platform ? classes.selectedPlatform : classes.others
                }
                title={text}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <img
                    className={classes.platformIcon}
                    src={`../../../public/png/${text}.png`}
                    width="40"
                    height="40"
                  />
                </ListItemIcon>

                <ListItemText primary={text} className={classes.listItemText} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["What's new", 'Help', 'Collapse'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon className={classes.listItemIcon}>
                {bottomIcons[index]}
              </ListItemIcon>
              <ListItemText primary={text} className={classes.listItemText} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default PlatformNav;
