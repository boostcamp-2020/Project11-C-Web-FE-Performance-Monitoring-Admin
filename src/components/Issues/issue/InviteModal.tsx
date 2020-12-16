import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Member from '@components/Issues/issue/Member';
import Api from '@utils/Api';
import Validation from '@utils/Validation';

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

const ModalTitle = styled.div`
  margin: 1rem 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ModalDescription = styled.p`
  margin: 0 0 1rem 0;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputText = styled.input`
  width: 20rem;
  padding: 0.2rem 0.4rem;
  border: none;
  border-bottom: 0.2rem solid rgba(0, 0, 0, 1);
  background: transparent;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;

const SearchButton = styled.button`
  justify-self: center;
  margin: 1rem 0;
  padding: 0.5rem;
  background-color: rgba(50, 50, 50, 0.5);
  border-radius: 10px;
  font-size: 1rem;
  color: white;
  &:not([disabled]):hover {
    background-color: rgba(0, 0, 0, 1);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
    transition: 5ms;
  }
  &:disabled:hover {
    cursor: auto;
  }
`;

const InviteModal = ({ setModalOpen, projectId }) => {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [users, setUsers] = useState(null);
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isInput, setIsInput] = useState(true);
  const [isBasicDescription, setIsBasicDescrption] = useState(true);

  const changeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
    setIsBasicDescrption(true);
  };

  const clickSearch = async evt => {
    evt.preventDefault();
    const result = await Api.getUserByEamil(email);
    if (result.data.length !== 0) {
      setUsers(result.data);
      setIsInput(false);
    } else {
      setEmail('');
      setIsBasicDescrption(false);
    }
  };

  const clickInvite = async (userId: string) => {
    const data = { userId };
    await Api.postInvite(projectId, data);
    setModalOpen(false);
  };

  useEffect(() => {
    setDisabled(!Validation.isRightEmail(email));
  }, [email]);

  return (
    <div style={modalStyle} className={classes.paper}>
      <ModalTitle id="simple-modal-title">Search people by email.</ModalTitle>
      <ModalDescription id="simple-modal-description">
        {isBasicDescription
          ? 'Search for people to invite to your project.'
          : 'There is no such user.'}
      </ModalDescription>
      {isInput ? (
        <InputForm>
          <InputText
            type="text"
            placeholder="Email"
            onChange={changeInput}
            value={email}
          />
          <SearchButton type="button" disabled={disabled} onClick={clickSearch}>
            Find user
          </SearchButton>
        </InputForm>
      ) : (
        users.map(user => (
          <Member
            key={user._id}
            name={user.name}
            onClick={() => clickInvite(user._id)}
          />
        ))
      )}
    </div>
  );
};

export default InviteModal;
