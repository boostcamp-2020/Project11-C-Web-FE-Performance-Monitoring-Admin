import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Api from '@utils/Api';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    borderRadius: '5px',
    backgroundColor: 'rgba(241, 241, 241, 1)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SignInForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignInInputTitle = styled.p`
  padding-top: 1rem;
`;

const SignInInput = styled.input`
  height: 2rem;
  margin-top: 1%;
  background-color: rgba(0, 0, 0, 0.5);
  outline: none;
  border: none;
  padding: 10px;
  color: rgba(241, 241, 241, 1);
  font-size: 1rem;
  border-radius: 5px;
`;

const SignInButton = styled.button`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #00bfa5;
  color: #f1f1f1;
  border-radius: 5px;
  font-size: 2rem;
  :not([disabled]):hover {
    background-color: rgba(0, 191, 165, 0.5);
    color: gray;
    transition: 0.5s;
  }
  :disabled:hover {
    cursor: auto;
  }
`;

const Divider = styled.div`
  width: inherit;
  margin: 2rem 0 0 0;
  border: 0.1rem solid rgba(0, 0, 0, 1);
`;

const SignInModal = ({ setModalOpen }) => {
  const history = useHistory();

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const changeInput = setInput => event => {
    setInput(event.target.value);
  };

  const clickSignIn = async () => {
    const userData = { email, pwd: password };
    const {
      data: { signIn, causeEmail },
    } = await Api.postSignIn(userData);

    if (signIn) {
      setModalOpen(false);
      history.push('/projects');
    }
  };

  const clickGoogle = () => {
    window.location.href = `${process.env.API_URL}/oauth/google`;
  };

  const clickGitHub = () => {
    window.location.href = `${process.env.API_URL}/oauth/github`;
  };

  useEffect(() => {
    setDisabled(!(email && password));
  }, [email, password]);

  return (
    <div style={modalStyle} className={classes.paper}>
      <SignInForm>
        <SignInInputTitle>Email</SignInInputTitle>
        <SignInInput value={email} onChange={changeInput(setEmail)} />
        <SignInInputTitle>Password</SignInInputTitle>
        <SignInInput
          type="password"
          value={password}
          onChange={changeInput(setPassword)}
        />
        <SignInButton disabled={disabled} onClick={clickSignIn}>
          Sign In
        </SignInButton>
        <Divider />
        <SignInButton onClick={clickGoogle}>Sign In with Google</SignInButton>
        <SignInButton onClick={clickGitHub}>Sign In with GitHub</SignInButton>
      </SignInForm>
    </div>
  );
};

export default SignInModal;
