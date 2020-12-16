import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Assigned from '../../issue/Assigned';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  eventsButton: {
    margin: theme.spacing(1),
    marginLeft: 0,
    marginRight: '1rem',
    textTransform: 'none',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
  },
  button: {
    margin: theme.spacing(1),
    marginRight: 0,
    textTransform: 'none',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
  },
  DetailHeaderContainer: {
    borderBottomWidth: '2px',
    borderColor: 'rgba(255,255,255,0.2)',
    borderBottomStyle: 'solid',
    marginBottom: '-3.8rem',
  },
  IssueContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  IssueInfoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  IssueName: {
    margin: '0',
    marginRight: '0.5rem',
    paddingTop: '0.5rem',
    height: 'fit-content',
    alignSelf: 'flex-start',
    fontSize: '2rem',
  },
  FileInfo: {
    margin: '0',
    marginBottom: '0.2rem',
    paddingTop: '0.5rem',
    height: 'fit-content',
    alignSelf: 'flex-end',
    fontSize: '1.7rem',
  },
  IssueUtilsContainer: {
    flex: '0.8',
    display: 'flex',
    flexDirection: 'column',
  },
  utilsNameContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    padding: '1rem',
    paddingTop: '0.5rem',
  },
  utilsProject: {
    gridColumnEnd: 'span 6',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
  utilsName: {
    gridColumnEnd: 'span 3',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
  utilsProjectValue: {
    gridColumnEnd: 'span 6',
    marginTop: '0.5rem',
    textAlign: 'center',
    fontSize: '1.2rem',
    width: 'fit-content',
    margin: '0 auto',
    borderBottomStyle: 'double',
    borderColor: 'rgba(140,255,255,0.8)',
  },
  utilsNameValue: {
    gridColumnEnd: 'span 3',
    marginTop: '0 auto',
    textAlign: 'center',
    backgroundColor: 'rgba(100,255,100,0.5)',
    borderRadius: '1.8rem',
    width: '2rem',
    height: '2rem',
    padding: '0.5rem',
  },
  ButtonContainer: {},
  IssueContainerLeft: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '0.5rem',
  },
  eventDate: {
    marginTop: '0',
  },
  messageIcon: {
    color: 'red',
    paddingTop: '0.3rem',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '-0.2rem',
  },
  messageValue: {
    marginTop: '0',
    marginLeft: '0.2rem',
  },
  utilsValueDiv: {
    gridColumnEnd: 'span 3',
    margin: '0 auto',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
}));

const DetailHeader = props => {
  const classes = useStyles();
  const history = useHistory();

  const handleResolve = () => {
    const updateIssuesResolve = async () => {
      const result = await axios.put(
        `${process.env.API_URL}/issue/resolved`,
        { issueIdList: props.issueId, resolved: true },
        {
          withCredentials: true,
        }
      );

      history.push(`/projects/${props.projectId}`);
    };

    updateIssuesResolve();
  };
  return (
    <div className={classes.DetailHeaderContainer}>
      <div className={classes.IssueContainer}>
        <div className={classes.IssueContainerLeft}>
          <div className={classes.IssueInfoContainer}>
            <strong className={classes.IssueName}>{props.name}</strong>{' '}
            <p className={classes.FileInfo}>{props.fileInfo}</p>
          </div>
          <div className={classes.messageContainer}>
            <FiberManualRecordIcon className={classes.messageIcon} />{' '}
            <h2 className={classes.messageValue}>{props.message}</h2>
          </div>
          <h3 className={classes.eventDate}> {props.date}</h3>
          <div className={classes.ButtonContainer}>
            <Button
              variant="contained"
              className={classes.eventsButton}
              startIcon={<EventNoteIcon />}
            >
              Events
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<DoneIcon />}
              onClick={handleResolve}
            >
              Resolve
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<HighlightOffIcon />}
            >
              Delete
            </Button>
          </div>
        </div>
        <div className={classes.IssueUtilsContainer}>
          <div className={classes.utilsNameContainer}>
            <div className={classes.utilsProject}>Project</div>
            <div className={classes.utilsName}>Events</div>
            <div className={classes.utilsName}>Assigned</div>
          </div>
          <div className={classes.utilsNameContainer}>
            <p className={classes.utilsProjectValue}>icon _ project name</p>
            <div className={classes.utilsValueDiv}>
              <div className={classes.utilsNameValue}>{props.count}</div>
            </div>

            <div className={classes.utilsValueDiv}>
              <Assigned
                members={props.members}
                issueId={props.issueId}
                assignee={props.assignee}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
