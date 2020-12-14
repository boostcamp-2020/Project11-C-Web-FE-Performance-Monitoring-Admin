import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Graph from '@components/utils/Graph';
import Avatar from '@material-ui/core/Avatar';
import Assigned from './Assigned';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: '0.1rem',
    borderColor: 'rgba(255,255,255,0.1)',
    borderTopStyle: 'solid',
  },
  IssueInfo: {
    gridColumnEnd: 'span 5',
    margin: '0 auto',
    marginLeft: '1rem',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  IssueNameArea: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1',
    width: '100%',
    color: '#FA5858',
    fontSize: '1.2rem',
  },
  IssueName: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  IssueInfoItem: {
    flex: '1',
    width: '100%',
    color: 'white',
    fontSize: '1rem',
    marginLeft: '1.2rem',
  },
  timeContainer: {
    flex: '1',
    width: '100%',
    color: 'white',
  },
  timeIcon: {
    paddingTop: '0.6rem',
    marginLeft: '1rem',
  },
  graphContainer: {
    display: 'flex',
    flexDirection: 'row',
    gridColumnEnd: 'span 3',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '1rem',
    marginBottom: '1rem',
    color: 'white',
  },
  graphStick: {
    flex: '1',
    margin: '0 auto',
    marginRight: '0.2rem',
    backgroundColor: 'red',
    height: '1px',
  },
  column: {
    gridColumnEnd: 'span 2',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '2.5rem',
    marginBottom: '2.5rem',
    color: 'white',
  },
  countAvatar: {
    backgroundColor: '#2979ff',
  },
}));

const IssueItem = props => {
  const history = useHistory();
  const classes = useStyles();

  const now = moment();
  const issueDate = moment(props.date);
  const dateDiff: string =
    now.diff(issueDate, 'days') > 0
      ? `${String(now.diff(issueDate, 'days'))}일`
      : `${String(now.diff(issueDate, 'hour'))}시간`;
  const dateForm = moment(props.date).format('YYYY.MM.DD HH:MM');
  const pathInfo = props.stack.split('\n')[1].split('/');
  const fileInfo = pathInfo[pathInfo.length - 1];

  const [errorEvents, setErrorEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function onTitleCiick() {
    history.push(`/issues/${props.issueId}`);
  }

  useEffect(() => {
    const getIssues = async () => {
      try {
        setError(null);
        setErrorEvents(null);

        setLoading(true);
        const respone: any = await axios.get(
          `${process.env.API_URL}/errorevent/issue/${props.issueId}`,
          {
            withCredentials: true,
          }
        );

        setErrorEvents(respone.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    getIssues();
  }, []);

  if (loading) {
    return <div>로딩중</div>;
  }
  if (error) return <div>에러가 발생했습니다</div>;
  if (!errorEvents) return null;

  return (
    <div className={classes.container}>
      <div className={classes.IssueInfo}>
        <div className={classes.IssueNameArea}>
          <input
            type="checkbox"
            id={props.issueId}
            onClick={props.onClick}
            className="item_checkbox"
            style={{ alignSelf: 'center' }}
          />
          <div className={classes.IssueName} onClick={onTitleCiick}>
            {props.name + '' + fileInfo}
          </div>
        </div>
        <div className={classes.IssueInfoItem}>{props.description}</div>
        <div className={classes.timeContainer}>
          <AccessTimeIcon fontSize="small" className={classes.timeIcon} />
          {dateForm}, {dateDiff} 전
        </div>
      </div>
      <Graph errorEvents={errorEvents} />
      <div className={classes.column}>
        <Avatar className={classes.countAvatar}>{props.eventNum}</Avatar>
      </div>
      <div className={classes.column}>
        <Assigned projectId={props.projectId} issueId={props.issueId} />
      </div>
    </div>
  );
};

export default IssueItem;
