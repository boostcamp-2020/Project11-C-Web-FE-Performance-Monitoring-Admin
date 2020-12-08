import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Api from '@utils/Api';

const ProjectsRoot = styled.div`
  top: 4.75rem;
  margin: 2rem;
`;

const Projects = () => {
  const history = useHistory();

  const [projects, setProjects] = useState([]);

  const readProjects = async () => {
    const { data } = await Api.getProjects();
    setProjects([...data]);
  };

  useEffect(() => {
    readProjects();
  }, []);

  return <ProjectsRoot>test</ProjectsRoot>;
};

export default Projects;
