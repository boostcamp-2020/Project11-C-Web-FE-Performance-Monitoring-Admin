import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Platforms from '@components/project-new/Platforms';
import ProjectForm from '@components/project-new/ProjectForm';
import Api from '../utils/Api';

const ProjectNewRoot = styled.div`
  top: 4.75rem;
  margin: 2rem 2rem 2rem 17rem;
  & > p {
    margin: 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const ProjectNewHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 0 2rem 0;
`;

const ProjectNewHeaderTitle = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

const CreateProjectButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 50rem;
  margin: 2rem 0 0 0;
`;

const CreateProjectButton = styled.button`
  padding: 1rem 2rem;
  border: 0.2rem solid rgba(0, 0, 0, 0.35);
  font-size: 1.5rem;
  font-weight: 600;
  &:not([disabled]):hover {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
    transition: 5ms;
  }
  &:disabled:hover {
    cursor: auto;
  }
`;

const ProjectNew = () => {
  const history = useHistory();

  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(true);

  const createProject = async () => {
    const inputData = { title, description, platform: selectedPlatform };
    const {
      data: { _id, platform, dsn },
    } = await Api.postProject(inputData);
    history.push({
      pathname: `/usage/${platform}`,
      state: { projectId: _id, dsn },
    });
  };

  const clickCreateProjectButton = () => {
    createProject();
  };

  useEffect(() => {
    setDisabled(!(selectedPlatform && title));
  }, [selectedPlatform, title]);

  return (
    <ProjectNewRoot>
      <ProjectNewHeader>
        <ProjectNewHeaderTitle>Create a new Project</ProjectNewHeaderTitle>
      </ProjectNewHeader>
      <Platforms
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
      />
      <ProjectForm
        title={title}
        setTitle={setTitle}
        setDescription={setDescription}
      />
      <CreateProjectButtonWrapper>
        <CreateProjectButton
          onClick={clickCreateProjectButton}
          disabled={disabled}
        >
          Create Project
        </CreateProjectButton>
      </CreateProjectButtonWrapper>
    </ProjectNewRoot>
  );
};

export default ProjectNew;
