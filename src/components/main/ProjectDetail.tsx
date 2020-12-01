import React from 'react';
import styled from 'styled-components';

const ProjectDetail = () => {
  return (
    <Wrapper>
      <ProjectHeader>
        <Title>Project A</Title>
        <SettingButton>Settings</SettingButton>
      </ProjectHeader>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0;
  padding: 40px;
  margin-left: var(--nav-width);

  width: auto;
  height: 100%;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: var(--font-big);
`;

const SettingButton = styled.button`
  font-size: var(--font-middle);
  border: black solid 1px;
  padding: 15px 25px;
  border-radius: 30px;
`;

export default ProjectDetail;
