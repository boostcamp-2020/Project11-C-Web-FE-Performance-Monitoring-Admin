import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  NoticeContainer: {
    margin: '0 auto',
    textAlign: 'center',
  },
  CreateProjectContainer: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
  },
  omg: {
    margin: '0 auto',
    marginLeft: '0',
    color: 'white',
    paddingTop: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '5%',
  },
  runImg: {
    width: '25rem',
    marginLeft: '20%',
  },
  backImg: {
    width: '25rem',
    marginTop: '5rem',
  },
  congrants: {
    color: 'white',
    fontSize: '1.5rem',
  },
  message: {
    marginTop: '0',
    marginBottom: '0',
  },
  advice: {
    marginTop: '1rem',
    fontSize: '1rem',
  },
  button: {
    margin: theme.spacing(1),
    marginLeft: '0',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
}));

const NoticeEmpty = ({ type }) => {
  const classes = useStyles();
  const history = useHistory();

  if (type === 'project') {
    const clickProjectsHeaderButton = () => {
      history.push('/projects/new');
    };
    return (
      <div className={classes.CreateProjectContainer}>
        <img
          className={classes.runImg}
          src="../../../public/png/run_color.png"
        />
        <div className={classes.omg}>
          <div>
            <h1 className={classes.message}>No project has been created.</h1>
            <p className={classes.advice}>Create a project and use Acent.</p>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={clickProjectsHeaderButton}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.NoticeContainer}>
      <img
        className={classes.backImg}
        src="../../../public/png/congratulations.png"
      />
      <p className={classes.congrants}>이슈가 아직 없습니다!</p>
    </div>
  );
};

export default NoticeEmpty;
