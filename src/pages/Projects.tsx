import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ProjectCard from '@components/projects/ProjectCard';
import Api from '@utils/Api';

const ProjectsRoot = styled.div`
  top: 4.75rem;
  margin: 2rem;
`;

const ProjectsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 2rem 0;
`;

const ProjectsHeaderTitle = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

const ProjectsHeaderButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 0.05rem rgba(0, 0, 0, 0.35) solid;
  font-weight: 600;
  & > svg {
    margin: 0 0.3rem 0 0;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
    transition: 5ms;
  }
`;

const ProjectsBody = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
  row-gap: 2rem;
`;

const Projects = () => {
  const history = useHistory();

  const [projects, setProjects] = useState([]);

  const readProjects = async () => {
    const { data } = await Api.getProjects();
    setProjects([...data]);
  };

  const clickProjectsHeaderButton = () => {
    history.push('/projects/new');
  };

  useEffect(() => {
    readProjects();
  }, []);

  return (
    <ProjectsRoot>
      <ProjectsHeader>
        <ProjectsHeaderTitle>Projects</ProjectsHeaderTitle>
        <ProjectsHeaderButton onClick={clickProjectsHeaderButton}>
          <AddCircleOutlineIcon />
          Create Project
        </ProjectsHeaderButton>
      </ProjectsHeader>
      <ProjectsBody>
        {projects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </ProjectsBody>
    </ProjectsRoot>
  );
};

export default Projects;
