import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';

import FolderSharedIcon from '@material-ui/icons/FolderShared';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

import NewReleasesIcon from '@material-ui/icons/NewReleases';
import HelpIcon from '@material-ui/icons/Help';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import UserContainer from './UserContainer';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const topIcons = [
  <FolderSharedIcon />,
  <ErrorOutlineIcon />,
  <Badge badgeContent={1} color="secondary">
    <NotificationsActiveIcon />{' '}
  </Badge>,
  <AssessmentIcon />,
  <SettingsApplicationsIcon />,
];

const bottomIcons = [<NewReleasesIcon />, <HelpIcon />, <SyncAltIcon />];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
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
}));

const LeftBar = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <UserContainer />
          {['Projects', 'Issues', 'Alerts', 'Stats', 'Settings'].map(
            (text, index) => (
              <ListItem
                component={Link}
                to={`/${text.toLowerCase()}`}
                button
                key={text}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {topIcons[index]}
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

export default LeftBar;
