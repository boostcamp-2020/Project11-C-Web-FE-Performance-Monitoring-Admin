import React from 'react';
import styled from 'styled-components';

import NavBar from '../components/main/NavBar';
import ProjectDetail from '../components/main/ProjectDetail';

const Main = () => {
  return (
    <Wrapper>
      <NavBar></NavBar>
      <ProjectDetail></ProjectDetail>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

export default Main;
