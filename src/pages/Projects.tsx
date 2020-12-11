import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ProjectCard from '@components/projects/ProjectCard';
import Api from '@utils/Api';
import LeftBar from '@components/Issues/LeftBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

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

const ProjectsRoot = styled.div``;

const ProjectsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  margin-bottom: 1rem;
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
  grid-template-columns: repeat(4, minmax(20%, 25rem));
  column-gap: 2rem;
  row-gap: 2rem;
`;

const Projects = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <CssBaseline />

      <LeftBar />
      <main className={classes.content}>
        <Toolbar />
        <div className={classes.ProjectsRoot}>
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
        </div>
      </main>
    </div>
  );
};

export default Projects;
