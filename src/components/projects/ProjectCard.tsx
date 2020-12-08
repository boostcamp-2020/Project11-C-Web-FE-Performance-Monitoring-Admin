import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

const ProjectCardRoot = styled.div`
  border: 0.05rem rgba(0, 0, 0, 0.35) solid;
  & > div {
    padding: 0.5rem;
  }
  &:hover {
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
    transition: 5ms;
  }
`;

const ProjectCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.1);
  & span {
    width: 25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ProjectCardHeaderTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
`;

const ProjectCardHeaderDescription = styled.span`
  font-size: 1rem;
  font-weight: 300;
`;

const ProjectCardBody = styled.div``;

const ProjectCardBodyErrorCount = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: rgba(180, 4, 4, 1);
`;

const ProjectCardBodyChart = styled.div`
  height: 10rem;
`;

const ProjectCartFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ProjectCard = ({ project }) => {
  const history = useHistory();

  const clickProjectCard = () => {
    history.push(`/projects/${project._id}`);
  };

  return (
    <ProjectCardRoot onClick={clickProjectCard}>
      <ProjectCardHeader>
        <ProjectCardHeaderTitle>{project.title}</ProjectCardHeaderTitle>
        <ProjectCardHeaderDescription>
          {project.description}
        </ProjectCardHeaderDescription>
      </ProjectCardHeader>
      <ProjectCardBody>
        <ProjectCardBodyErrorCount>
          Unresolved errors: 0
        </ProjectCardBodyErrorCount>
        <ProjectCardBodyChart>Chart</ProjectCardBodyChart>
      </ProjectCardBody>
      <ProjectCartFooter>
        Created {moment(project.createdAt).format('YYYY/MM/DD')} by{' '}
        {project.owner.name}
      </ProjectCartFooter>
    </ProjectCardRoot>
  );
};

export default ProjectCard;
