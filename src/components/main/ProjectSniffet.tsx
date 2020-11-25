import React from 'react';
import styled from 'styled-components';

type ProjectProps = {
  projectName: string;
  color: string;
  link: string;
};

const ProjectSniffet = ({ projectName, color, link }: ProjectProps) => {
  return (
    <Wrapper href={link}>
      <ProjectContainer color={color}>
        <ProjectNameText>{projectName}</ProjectNameText>
      </ProjectContainer>
    </Wrapper>
  );
};

const Wrapper = styled.a`
  text-decoration: none;
`;

const ProjectContainer = styled.div`
  width: 100px;
  height: 100px;
  background: ${props => props.color};
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProjectNameText = styled.p`
  text-align: center;
  font-size: 40px;
`;

export default ProjectSniffet;
