import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Member from './Member';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function InviteModal() {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setUsers(null);

        const response: any = await axios.get(
          `${process.env.API_URL}/user/all`,
          {
            withCredentials: true,
          }
        );

        setUsers(response.data);
      } catch (e) {
        setError(e);
      }
    };

    getUsers();
  }, []);

  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) {
    return null;
  }

  const handleInviting = () => {
    console.log('초대');
  };

  return (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">People you can invite.</h2>
      {users.map(user => (
        <Member key={user._id} name={user.name} onClick={handleInviting} />
      ))}
      <p id="simple-modal-description">
        If the inviter accepts your request, that person becomes a member.
      </p>
    </div>
  );
}
