// eslint-disable-next-line no-use-before-define
import React from 'react';
import styled from 'styled-components';
import Header from '@components/utils/Header';
import LeftContents from '@components/login/LeftContents';
import RightContents from '@components/login/RightContents';

const BackImg = styled.img`
  width: 100%;
  margin-top: 5%;
  position: absolute;
`;

const Login: React.FC = () => {
  return (
    <RootContainer>
      <Header />
      <BodyContainer>
        <LeftContents />
        <RightContents />
      </BodyContainer>
      <BackImg src="../../public/svg/fractal_25.svg" />
    </RootContainer>
  );
};

const BodyContainer = styled.div`
  width: 80%;
  height: 80%;

  display: flex;
  flex-direction: row;

  margin: 0 auto;
  margin-top: 4rem;
  z-index: 2;
`;

const RootContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  margin: 0 auto;
`;

export default Login;
