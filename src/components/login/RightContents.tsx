import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1.1;

  margin-bottom: 2rem;
  margin-left: 6rem;
  margin-right: 5.6rem;

  background-color: rgba(0, 0, 0, 0.3);

  border-radius: 5px;

  text-align: center;
`;

const BackgroundImage = styled.img`
  width: 20rem;
  margin-top: 4.5rem;
  position: absolute;
  z-index: 1;
  top: 4.3rem;
  left: 58.5rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 0.5rem;
  padding-bottom: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;

  position: relative;
  z-index: 2;
  text-align: left;
`;

const TextField = styled.input`
  height: 2rem;
  margin-top: 1%;
  background-color: rgba(255, 255, 255, 0.1);
  outline: none;
  border: none;
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
    window.location.href = 'http://localhost:3000/oauth/google';
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
        <TextField />
        <FormText>Email</FormText>
        <TextField />
        <FormText>Password</FormText>
        <TextField />
        <SingUpButton>Sign Up</SingUpButton>
        <FormText>
          Click <OauthLink onClick={OauthHandler}>this </OauthLink> - if you
          want to sign in more simply. You are signed in{' '}
          <OauthLink onClick={OauthHandler}>with Google</OauthLink>.
        </FormText>
      </Form>
    </Container>
  );
};

export default RightContents;
