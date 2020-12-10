import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Member from './Member';
import Modal from '@material-ui/core/Modal';
import InviteModal from './InviteModal';

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
    width: '11.5rem',
    padding: '1rem',
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: 'lightgray',
  },
  addButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: '0.2rem',
    textTransform: 'none',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  newAssigned: {
    color: 'white',
    paddingRight: '1rem',
    textTransform: 'none',
  },
}));

export default function Assigned(props) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [projectMembers, setProjectMembers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProject = async () => {
      try {
        setProjectMembers(null);

        const response: any = await axios.get(
          `http://localhost:3000/project/${props.projectId}`,
          {
            withCredentials: true,
          }
        );

        // setProjectMembers(response.data.members);
        setProjectMembers([
          { _id: 'a1234', name: 'ohmink', email: 'testers@test.com' },
          { _id: 'bdd00', name: 'jeesooha', email: 'hong@universe.com' },
        ]);
      } catch (e) {
        setError(e);
      }
    };

    getProject();
  }, []);

  if (error) return <div>에러가 발생했습니다</div>;
  if (!projectMembers) {
    return null;
  }

  //담당자 변경하는 api 요청을 추가해야함
  const handleAssigned = event => {
    let memberContainer = event.target.closest(`div`);

    if (event.target.nodeName === 'svg' || event.target.nodeName === 'path') {
      memberContainer = memberContainer.parentNode;
    }

    const assignedUser: string = memberContainer.id;
    const parent = document.getElementById(`${props.issueId}assigneeButton`)
      .firstChild;

    const userIcon = document.getElementById(`${props.issueId}userIcon`);
    const openIcon = document.getElementById(`${props.issueId}openIcon`);

    const newIcon = document.createElement('img');
    newIcon.src = '../../../public/svg/gom_icon.png';
    newIcon.id = props.issueId + 'userIcon';
    newIcon.width = 15;
    newIcon.height = 15;

    const newAssigned = document.createElement('p');
    newAssigned.className = classes.newAssigned;
    newAssigned.id = props.issueId + 'openIcon';
    newAssigned.onclick = handleClick;
    newAssigned.innerHTML = `${assignedUser}`;

    parent.replaceChild(newIcon, userIcon);
    parent.replaceChild(newAssigned, openIcon);

    setAnchorEl(null);
  };

  let Members = (
    <div className={classes.usersContainer}>
      {projectMembers.map(member => (
        <Member
          key={member._id}
          name={member.name}
          target={classes.openUserListButton}
          onClick={handleAssigned}
        />
      ))}
      <span className={classes.divider} />
      <Button
        variant="contained"
        size="small"
        className={classes.addButton}
        startIcon={<AddBoxIcon />}
        onClick={handleModalOpen}
      >
        Invite someone?
      </Button>
    </div>
  );

  if (projectMembers.length === 0) {
    Members = (
      <div className={classes.usersContainer}>
        There is no one.
        <span className={classes.divider} />
        <Button
          variant="contained"
          size="small"
          className={classes.addButton}
          startIcon={<AddBoxIcon />}
          onClick={handleModalOpen}
        >
          Invite someone?
        </Button>
      </div>
    );
  }

  return (
    <div className="assignedContainer">
      <Button
        className={classes.openUserListButton}
        aria-describedby={id}
        id={props.issueId + 'assigneeButton'}
        variant="contained"
        onClick={handleClick}
      >
        <PersonAddIcon
          className={classes.userIcon}
          id={props.issueId + 'userIcon'}
        />
        <ArrowDropDownIcon
          className={classes.openIcon}
          id={props.issueId + 'openIcon'}
        />
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
        {Members}
      </Popover>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <InviteModal />
      </Modal>
    </div>
  );
}
