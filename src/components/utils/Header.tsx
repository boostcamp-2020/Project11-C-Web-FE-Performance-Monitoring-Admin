import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const HeaderButton = styled.button`
  margin: 0 auto;
  padding: 1rem;
  padding-left: 2rem;

  font-size: 1.5rem;
  color: white;

  text-align: center;
  background-color: rgba(255, 255, 255, 0);

  &:hover {
    color: lightgray;
  }
`;

const HomeButton = styled.button`
  margin: 0 auto;
  padding: 1rem;
  padding-left: 2rem;

  font-size: 1.5rem;
  color: #64ffda;

  text-align: center;
  background-color: rgba(255, 255, 255, 0);

  &:hover {
    color: #00bfa5;
  }
`;

const HeaderContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const GlobalHeader = () => {
  const HomeHandler = () => {
    //process.env로 변경해야 함.
    window.location.href = 'http://localhost:8000/';
  };
  return (
    <HeaderContainer>
      <Grid container spacing={1}>
        <Grid item xs>
          <HomeButton onClick={HomeHandler}>@Acent</HomeButton>
        </Grid>
        <Grid item xs={6}>
          <HeaderButton>Docs</HeaderButton>
          <HeaderButton>Tutorial</HeaderButton>
        </Grid>
        <Grid item xs>
          <HeaderButton>Sign in</HeaderButton>
          <HeaderButton>Sign up</HeaderButton>
        </Grid>
      </Grid>
    </HeaderContainer>
  );
};

export default GlobalHeader;
