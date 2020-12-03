import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '@utils/Api';

const Projects = () => {
  const history = useHistory();

  const redirectProjects = async () => {
    const {
      data: { recentProject },
    } = await Api.getUser();
    if (recentProject) {
      history.push(`/projects/${recentProject}`);
    } else {
      history.push('/projects/new');
    }
  };

  useEffect(() => {
    redirectProjects();
  }, []);

  return <></>;
};

export default Projects;
