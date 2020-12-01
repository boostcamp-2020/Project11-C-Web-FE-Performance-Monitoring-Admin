import React from 'react';
import styled from 'styled-components';
import ProjectSniffet from './ProjectSniffet';

type ProjectProps = {
  projectName: string;
  color: string;
  link: string;
};

const PROJECT_LIST: ProjectProps[] = [
  { projectName: 'A', color: 'red', link: '' },
  { projectName: 'B', color: 'green', link: '' },
  { projectName: 'C', color: 'orange', link: '' },
];

const NavBar = () => {
  return (
    <Wrapper>
      {PROJECT_LIST.map(project => (
        <ProjectSniffet
          projectName={project.projectName}
          color={project.color}
          link={project.link}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.p`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0;
  padding-top: 20px;
  left: 0;
  top: 0;
  width: var(--nav-width);
  height: 100vh;
  background: var(--nav-bar);
`;

export default NavBar;
