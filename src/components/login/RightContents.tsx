import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const MIN_USERNAME_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 8;

const Container = styled.div`
  flex: 1.1;

  margin-bottom: 2rem;
  margin-left: 6rem;
  margin-right: 5.6rem;

  background-color: rgba(0, 0, 0, 0.3);

  border-radius: 5px;

  text-align: center;
`;

const rotate = keyframes`
  0% {left: 40%; transform: rotate(0deg);}
  25% {left: 43%; transform: rotate(90deg);}
  50% {left: 46%; transform: rotate(180deg);}
  75% {left: 49%; transform: rotate(270deg);}
  100% {left: 52%; transform: rotate(360deg);}
`;

const BackgroundImage = styled.img`
  width: 20rem;
  margin-top: 4.5rem;
  position: absolute;
  z-index: 1;
  top: 10%;
  left: 52%;
  animation: ${rotate} 5s linear;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;

  width: 400px;

  padding-top: 0.5rem;
  padding-bottom: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;

  position: relative;
  z-index: 2;
  text-align: left;
`;

const TextField = styled.input<{ borderOption: string }>`
  height: 2rem;
  margin-top: 1%;
  background-color: rgba(255, 255, 255, 0.1);
  outline: none;
  border: none;
  padding: 10px;
  font-size: 1rem;
  border: ${props => props.borderOption};
  border-radius: 5px;
`;

const FormText = styled.p`
  padding-top: 1rem;
  color: #f1f1f1;
`;

const SingUpButton = styled.button`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #64ffda;
  border-radius: 5px;
  font-size: 2rem;
  color: gray;
  :hover {
    background-color: #00bfa5;
    color: #f1f1f1;
    transition: 0.5s;
  }
`;

const OauthLink = styled.i`
  font-size: 1.1rem;
  color: #a7ffeb;
  &:hover {
    color: #00bfa5;
  }
`;

const RightContents = () => {
  const OauthHandler = () => {
    window.location.href = `${process.env.API_URL}/oauth/google`;
  };
  const Github = () => {
    window.location.href = `${process.env.API_URL}/oauth/github`;
  };

  const [usernameInput, setUsenameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasInput] = useState<string>('');

  const handleInput = setInput => event => {
    setInput(event.target.value);
  };

  const isRightUserName = inputValue => {
    if (inputValue.length < MIN_USERNAME_LENGTH) return false;
    return true;
  };

  const isRightEmail = inputValue => {
    const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]+\.[a-zA-Z]+$/i;
    return emailRegExp.test(inputValue);
  };

  const isRightPassword = inputValue => {
    if (inputValue.length < MIN_PASSWORD_LENGTH) return false;
    return true;
  };

  const checkInputValidation = (inputValue, isValid) => {
    if (inputValue === '') return 'none';
    if (!isValid(inputValue)) return '2px solid rgba(255, 0, 0, 0.5)';
    return '2px solid rgba(0, 255, 0, 0.5)';
  };

  return (
    <Container>
      <BackgroundImage src="../../public/svg/circle.svg" />
      <Form>
        <FormText>
          Make sure it's at least 15 characters OR at least 8 characters
          including a number and a lowercase letter.
        </FormText>
        <FormText>Username</FormText>
        <TextField
          value={usernameInput}
          onChange={handleInput(setUsenameInput)}
          borderOption={checkInputValidation(usernameInput, isRightUserName)}
        />
        <FormText>Email</FormText>
        <TextField
          value={emailInput}
          onChange={handleInput(setEmailInput)}
          borderOption={checkInputValidation(emailInput, isRightEmail)}
        />
        <FormText>Password</FormText>
        <TextField
          value={passwordInput}
          onChange={handleInput(setPasInput)}
          borderOption={checkInputValidation(passwordInput, isRightPassword)}
        />
        <SingUpButton>Sign Up</SingUpButton>
        <FormText>
          Click this if you want to sign in more simply. You are signed in with{' '}
          <OauthLink onClick={OauthHandler}>Google</OauthLink> or
          <OauthLink onClick={Github}>Github</OauthLink>
        </FormText>
      </Form>
    </Container>
  );
};

export default RightContents;
