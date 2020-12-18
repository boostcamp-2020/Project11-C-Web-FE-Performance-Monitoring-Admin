import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
import { IssuesDispatchContext } from '../../context/IssuesProvider';

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
  background-color: rgba(0, 0, 0, 0.4);
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

const ProjectCardBody = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
`;

const ProjectCardBodyChart = styled.div`
  height: 10rem;
  display: flex;
  justify-content: center;
`;

const ProjectCardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ProjectCardBodyImage = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: contain;
`;

const getIssues = async (projectId: string) => {
  const response: any = await axios.get(
    `${process.env.API_URL}/issue/project/${projectId}/${1}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const ProjectCard = ({ project }) => {
  const history = useHistory();
  const issuesDispatch = useContext(IssuesDispatchContext);

  const clickProjectCard = async () => {
    const newIssues = await getIssues(project._id);
    issuesDispatch({ type: 'set', issues: newIssues });
    history.push(`/projects/issues/${project._id}`);
  };

  return (
    <ProjectCardRoot onClick={clickProjectCard}>
      <ProjectCardHeader>
        <ProjectCardHeaderTitleWrapper isPlatform={!!project.platform}>
          <ProjectCardHeaderTitle>{project.title}</ProjectCardHeaderTitle>
        </ProjectCardHeaderTitleWrapper>
        <ProjectCardHeaderDescription>
          {project.description}
        </ProjectCardHeaderDescription>
      </ProjectCardHeader>
      <ProjectCardBody>
        <ProjectCardBodyChart>
          {project.platform && (
            <ProjectCardBodyImage
              src={`../../../public/png/${project.platform}.png`}
            />
          )}
        </ProjectCardBodyChart>
      </ProjectCardBody>
      <ProjectCardFooter>
        Created {moment(project.createdAt).format('YYYY/MM/DD')} by{' '}
        {project.owner?.name}
      </ProjectCardFooter>
    </ProjectCardRoot>
  );
};

export default ProjectCard;
