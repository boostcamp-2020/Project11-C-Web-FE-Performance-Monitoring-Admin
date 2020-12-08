import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectCard from '@components/projects/ProjectCard';
import Api from '@utils/Api';

const ProjectsRoot = styled.div`
  top: 4.75rem;
  margin: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
  row-gap: 2rem;
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const readProjects = async () => {
    const { data } = await Api.getProjects();
    setProjects([...data]);
  };

  useEffect(() => {
    readProjects();
  }, []);

  return (
    <ProjectsRoot>
      {projects.map(project => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </ProjectsRoot>
  );
};

export default Projects;
