import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Chart from '@components/common/Chart';
import Api from '@utils/Api';

const ProjectDetailWrapper = styled.div`
  margin: 5rem 0 0 5rem;
`;

const ProjectDetail = ({ match }) => {
  const [title, setTitle] = useState('');

  const readProject = async () => {
    const {
      data: { title },
    } = await Api.getProject(match.params.projectId);
    setTitle(title);
  };

  useEffect(() => {
    readProject();
  }, []);

  return (
    <ProjectDetailWrapper>
      <h1>{title}</h1>
      <Chart />
    </ProjectDetailWrapper>
  );
};

export default ProjectDetail;
