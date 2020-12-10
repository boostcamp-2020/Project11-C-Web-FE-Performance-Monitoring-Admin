import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DateHelper from '@components/utils/DateHelper';
import Graph from '@components/utils/Graph';
import Avatar from '@material-ui/core/Avatar';
import Assigned from './Assigned';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: '0.1rem',
    borderColor: 'rgba(255,255,255,0.1)',
    borderTopStyle: 'solid',
    border: 'red',
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
  IssueName: {
    flex: '1',
    width: '100%',
    color: '#FA5858',
    fontSize: '1.2rem',
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
  const classes = useStyles();
  const dateDiff = DateHelper.getDiff(props.date);
  const dateForm = DateHelper.getForm(props.date);

  const pathInfo = props.stack.split('\n')[1].split('/');
  const fileInfo = pathInfo[pathInfo.length - 1];

  const [errorEvents, setErrorEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        <div className={classes.IssueName}>
          <input
            type="checkbox"
            id={props.issueId}
            onClick={props.onClick}
            className="item_checkbox"
          />
          {props.name + '(' + fileInfo}
        </div>
        <div className={classes.IssueInfoItem}>{props.description}</div>
        <div className={classes.timeContainer}>
          <AccessTimeIcon fontSize="small" className={classes.timeIcon} />
          {dateDiff}일 전, {dateForm}
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
