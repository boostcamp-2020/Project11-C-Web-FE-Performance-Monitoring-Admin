import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import SortButton from './SortButton';
import SearchButton from './SearchButton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    marginBottom: '1rem',
    backgroundColor: 'rgba(30,30,40,0.3)',
  },
  issueCount: {
    gridColumnEnd: 'span 5',
    marginLeft: '1.2rem',
    marginTop: '1.2rem',
    marginBottom: '1rem',
    color: 'white',
    fontSize: '1.2rem',
  },
  project: {
    display: 'flex',
    flexDirection: 'row',
    gridColumnEnd: 'span 3',
    margin: '0 auto',
    marginTop: '1rem',
    marginBottom: '1rem',
    color: 'white',
    fontSize: '1.2rem',
  },
  projectName: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    fontSize: '0.8rem',
  },
  projectNameValue: {
    color: 'white',
    textTransform: 'none',
    fontSize: '1.3rem',
    marginLeft: '0.5rem',
  },
  column: {
    gridColumnEnd: 'span 2',
    margin: '0 auto',
    marginTop: '1rem',
    marginBottom: '1rem',
    color: 'white',
    fontSize: '1.2rem',
  },
}));

const Filter = props => {
  const classes = useStyles();
  const [projectName, setProjectName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProject = async () => {
      try {
        setProjectName(null);

        const response: any = await axios.get(
          `${process.env.API_URL}/project/${props.projectId}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setProjectName(response.data.title);
      } catch (e) {
        setError(e);
      }
    };

    getProject();
  }, []);

  if (error) return <div>에러가 발생했습니다</div>;
  if (!projectName) return null;

  return (
    <div className={classes.container}>
      <div className={classes.issueCount}>Issues ({props.eventNum})</div>
      <div className={classes.project}>
        <span className={classes.projectName}>Project Title : </span>
        <p className={classes.projectNameValue}>{projectName}</p>
      </div>
      <div className={classes.column}>
        <SortButton />
      </div>
      <div className={classes.column}>
        <SearchButton />
      </div>
    </div>
  );
};

export default Filter;
