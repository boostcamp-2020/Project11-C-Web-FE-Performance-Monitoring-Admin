import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import { UserStateContext } from '../../context/UserProvider';

const useStyles = makeStyles(theme => ({
  name: {
    color: 'white',
    fontSize: '1rem',
  },
  email: {
    color: 'lightgray',
    fontSize: '0.7rem',
  },
}));

const UserContainer = () => {
  const classes = useStyles();
  const userState = React.useContext(UserStateContext);

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <NewReleasesIcon />
        </Avatar>
      </ListItemAvatar>
      <div>
        <p className={classes.name}>{userState[1]}</p>
        <p className={classes.email}>{userState[2]}</p>
      </div>
    </ListItem>
  );
};

export default UserContainer;
