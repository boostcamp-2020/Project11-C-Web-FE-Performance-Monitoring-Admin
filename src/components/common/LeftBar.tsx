import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import FolderSharedIcon from '@material-ui/icons/FolderShared';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

import NewReleasesIcon from '@material-ui/icons/NewReleases';
import HelpIcon from '@material-ui/icons/Help';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import UserContainer from './UserContainer';
import { PositionStateContext } from '../../context/PositionProvider';

const drawerWidth = 240;

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
  selectedContent: {
    backgroundColor: 'rgba(200,200,200,0.3)',
  },
  others: {},
  alertIcon: {
    color: '#e22d2d',
  },
}));

const LeftBar = () => {
  const classes = useStyles();
  const content = React.useContext(PositionStateContext);
  const history = useHistory();

  const topIcons = [
    <FolderSharedIcon />,
    <NotificationsActiveIcon className={classes.alertIcon} />,
    <ErrorOutlineIcon />,
    <AssessmentIcon />,
    <SettingsApplicationsIcon />,
  ];

  React.useEffect(() => {
    const target = document.querySelector('.MuiDrawer-paperAnchorDockedLeft');
    target.setAttribute('style', 'border-right: none;');
  }, []);

  const contentClicked = event => {
    const target = event.target.closest(`.${classes.others}`);

    if (target) {
      switch (target.title) {
        case 'Projects':
          if (content[0] !== 'Projects') {
            history.push('/projects');
          }
          break;
        case 'Issues':
          if (content[0] !== 'Issues' && content[1]) {
            history.push(`/projects/issues/${content[1]}`);
          }
          break;
        case 'Alerts':
          if (content[0] !== 'Alerts') {
            history.push(`/alerts`);
          }
          break;
        case 'Stats':
          if (content[0] !== 'Stats' && content[1]) {
            history.push(`/projects/${content[1]}/stats`);
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer} onClick={contentClicked}>
        <List>
          <UserContainer />
          {['Projects', 'Alerts', 'Issues', 'Stats', 'Settings'].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                className={
                  text === content[0] ? classes.selectedContent : classes.others
                }
                title={text}
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
