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
    cursor: pointer;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
    transition: 5ms;
  }
`;

const ProjectCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  height: 4.5rem;
  background-color: rgba(0, 0, 0, 0.1);
  & span {
    width: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ProjectCardHeaderTitleWrapper = styled.div<{ isPlatform: boolean }>`
  display: flex;
  justify-content: ${props =>
    props.isPlatform ? 'space-between' : 'flex-start'};
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

const ProjectCardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ProjectCardFooterImage = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: contain;
`;

const ProjectCard = ({ project }) => {
  const history = useHistory();

  const clickProjectCard = () => {
    history.push(`/projects/${project._id}`);
  };

  return (
    <ProjectCardRoot onClick={clickProjectCard}>
      <ProjectCardHeader>
        <ProjectCardHeaderTitleWrapper isPlatform={!!project.platform}>
          <ProjectCardHeaderTitle>{project.title}</ProjectCardHeaderTitle>
          {project.platform && (
            <ProjectCardFooterImage
              src={`../../../public/png/${project.platform}.png`}
            />
          )}
        </ProjectCardHeaderTitleWrapper>
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
      <ProjectCardFooter>
        Created {moment(project.createdAt).format('YYYY/MM/DD')} by{' '}
        {project.owner.name}
      </ProjectCardFooter>
    </ProjectCardRoot>
  );
};

export default ProjectCard;
