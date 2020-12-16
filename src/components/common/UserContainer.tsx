import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

const useStyles = makeStyles(theme => ({
  name: {
    color: 'white',
    fontSize: '1rem',
  },
  email: {
    color: 'lightgray',
  },
}));

const UserContainer = ({ name, email, url }) => {
  console.log(name, email);
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <NewReleasesIcon />
        </Avatar>
      </ListItemAvatar>
      <div>
        <p className={classes.name}>{name}</p>
        <p className={classes.email}>{email}</p>
      </div>
    </ListItem>
  );
};

export default UserContainer;
