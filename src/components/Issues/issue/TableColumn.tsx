import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import axios from 'axios';
import IssueItem from './IssueItem';
import { ResolveDispatchContext, ResolveStateContext } from './ResolveProvider';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    backgroundColor: 'rgba(89,89,89,0.3)',
  },
  controller: {
    gridColumnEnd: 'span 5',
    textAlign: 'center',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '3rem',
  },
  resolveButton: {
    marginLeft: '1.25rem',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: 'rgba(50,50,50,0.2)',
    textTransform: 'none',
    color: 'white',
  },
  controllerItem: {
    marginLeft: '1.25rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  IssueInfoItem: {
    flex: '1',
    width: '100%',
  },
  graph: {
    gridColumnEnd: 'span 3',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '1rem',
    marginBottom: '1rem',
    color: 'white',
  },
  column: {
    gridColumnEnd: 'span 2',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '1rem',
    marginBottom: '1rem',
    color: 'white',
  },
}));

const TableColumn = props => {
  const classes = useStyles();
  const resolveDispatch = useContext(ResolveDispatchContext);
  const resolveState = useContext(ResolveStateContext);
  const { issues } = props;
  const [disable, setDisable] = useState(true);
  console.log('밖', resolveState);
  console.log(issues);

  const handleCheckedAll = event => {
    console.log('all before', resolveState);

    const itemCheckBox = document.querySelectorAll('.item_checkbox');
    itemCheckBox.forEach(
      checkbox =>
        ((checkbox as HTMLInputElement).checked = !(checkbox as HTMLInputElement)
          .checked)
    );

    if (event.target.checked) {
      issues.forEach(issue => {
        resolveDispatch({ type: 'add', issueId: issue._id });
      });
    } else {
      resolveDispatch({ type: 'removeAll' });
    }

    console.log('all result', resolveState);

    if (disable === true) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const handleChecked = event => {
    console.log('before', resolveState);

    const checkbox = event.target;

    if (checkbox.checked) {
      if (!resolveState.includes(checkbox.id)) {
        resolveDispatch({ type: 'add', issueId: checkbox.id });
      }
    } else if (resolveState.includes(checkbox.id)) {
      console.log('해제');
      resolveDispatch({ type: 'remove', issueId: checkbox.id });
    }

    if (resolveState.length === 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }

    console.log('after', resolveState);
  };

  const handleResolve = async () => {
    // 서버로 이슈들의 상태를 전송해야함.
    const updateIssueResolve = async () => {
      const response = await axios;
    };

    console.log('resolve button test');
    console.log(resolveState);
  };

  useEffect(() => {
    console.log(issues);
    if (resolveState.length === 0) {
      console.log('useEffect');
      setDisable(true);
    }
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.controller}>
          <input
            type="checkbox"
            className={classes.controllerItem}
            onClick={handleCheckedAll}
          />
          <Button
            variant="contained"
            className={classes.resolveButton}
            startIcon={<DoneIcon />}
            id="Resolved_button"
            disabled={disable}
            onClick={handleResolve}
          >
            Resolve
          </Button>
        </div>
        <div className={classes.graph}>Graph</div>
        <div className={classes.column}>Events</div>
        <div className={classes.column}>Assigned</div>
      </div>
      {issues.map(issue => (
        <IssueItem
          key={issue._id}
          issueId={issue._id}
          name={issue.name}
          description={issue.message}
          eventNum={issue.errorEvents.length}
          userNum={issue.users}
          assigned={issue.assigned}
          errorEvents={issue.errorEvents}
          stack={issue.stack}
          date={issue.createdAt}
          projectId={issue.projectId}
          onClick={handleChecked}
        />
      ))}
    </div>
  );
};

export default TableColumn;
