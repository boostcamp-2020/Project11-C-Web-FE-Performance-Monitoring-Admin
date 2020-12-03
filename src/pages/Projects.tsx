import React from 'react';
import styled from 'styled-components';

import Header from '@components/utils/Header';
import LeftBar from '@components/projects/LeftBar';
import MainContainer from '@components/projects/MainContainer';

const Projects: React.FC = () => {
  return (
    <RootContainer>
      <Header />
      <ContentsContainer>
        <LeftBar />
        <MainContainer />
      </ContentsContainer>
    </RootContainer>
  );
};

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const RootContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  margin: 0 auto;
`;

export default Projects;
