import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Platforms from '@components/project-new/Platforms';
import ProjectForm from '@components/project-new/ProjectForm';
import Api from '../utils/Api';
import LeftBar from '@components/Issues/LeftBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  ProjectsRoot: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: '0',
    paddingLeft: '0',
    marginTop: '-0.5rem',
    color: 'white',
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ProjectNewRoot = styled.div`
  top: 4.75rem;
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
  justify-content: flex-end;
  width: 50rem;
  margin: 0;
`;

const CreateProjectButton = styled.button`
  padding: 1rem;
  background-color: rgba(50, 50, 50, 0.5);
  border-radius: 10px;
  font-size: 1.2rem;
  color: white;
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
  const classes = useStyles();

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
    <div className={classes.root}>
      <CssBaseline />

      <LeftBar />
      <main className={classes.content}>
        <Toolbar />
        <div className={classes.ProjectsRoot}>
          <ProjectNewRoot>
            <ProjectNewHeader>
              <ProjectNewHeaderTitle>
                Create a new Project
              </ProjectNewHeaderTitle>
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
        </div>
      </main>
    </div>
  );
};

export default ProjectNew;
