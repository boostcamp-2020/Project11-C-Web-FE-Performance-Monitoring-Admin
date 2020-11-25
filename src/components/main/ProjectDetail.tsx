import React from 'react';
import styled from 'styled-components';

const ProjectDetail = () => {
  return (
    <Wrapper>
      <ProjectHeader>
        <Title>hello</Title>
        <SettingButton>Settings</SettingButton>
      </ProjectHeader>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  margin-left: 150px;

  width: auto;
  height: 100%;
  background: #aaaaaa;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p``;

const SettingButton = styled.button``;

export default ProjectDetail;
