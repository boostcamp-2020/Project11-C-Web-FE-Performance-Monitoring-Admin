import React, { useState, useEffect } from 'react';
import IssueDetailApi from '@utils/IssueDetailApi';
import Button from '@material-ui/core/Button';
import { Backdrop } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import SkipNext from '@material-ui/icons/SkipNext';
import ErrorEventInfo from './ErrorEvent/ErrorEventInfo';
import DetailHeader from './Header/DetailHeader';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 5,
    color: '#fff',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
  },
  DetailContainer: {
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    backgroundColor: 'rgba(0,0,0,0.3)',
    minHeight: '100%',
    color: 'white',
  },
  switchContainer: {
    textAlign: 'right',
  },
}));

const MainContainer = (props: { issueId: string }) => {
  const classes = useStyles();
  const { issueId } = props;
  const [issue, setIssue] = useState(null); // 이슈 상세정보
  const [isLoading, setIsLoading] = useState(true); // 로딩상태 state
  const [errorEvent, seterrorEvent] = useState(null); // 현재 에러이벤트 정보
  const [currentErrorEventIdx, setCurrentErrorEventIdx] = useState(-1); // 현재 에러이벤트 인덱스 issue.ErrorEvents[idx]

  // 이전 이벤트 불러오기
  const prevErrorEventHandler = async () => {
    const { errorEvents } = issue;
    setIsLoading(true);
    const preidx = currentErrorEventIdx - 1;
    setCurrentErrorEventIdx(preidx);
    const errorEventData = await IssueDetailApi.getErrorEventByErrorEventId(
      errorEvents[preidx]
    );
    seterrorEvent(errorEventData);
    setIsLoading(false);
  };
  // 다음 이벤트 불러오기
  const nextErrorEventHandler = async () => {
    const { errorEvents } = issue;
    setIsLoading(true);
    const preidx = currentErrorEventIdx + 1;
    setCurrentErrorEventIdx(preidx);
    const errorEventData = await IssueDetailApi.getErrorEventByErrorEventId(
      errorEvents[preidx]
    );
    seterrorEvent(errorEventData);
    setIsLoading(false);
  };

  useEffect(() => {}, [currentErrorEventIdx]);

  const initISsueData = async () => {
    setIsLoading(true);
    const issueData = await IssueDetailApi.getDetailIssueByIssueId(issueId);
    setIssue(issueData);
    const errorEventId =
      issueData.errorEvents[issueData.errorEvents.length - 1];
    const errorEventData = await IssueDetailApi.getErrorEventByErrorEventId(
      errorEventId
    );
    setCurrentErrorEventIdx(issueData.errorEvents.length - 1);
    seterrorEvent(errorEventData);
    setIsLoading(false);
  };

  useEffect(() => {
    initISsueData(); // 이슈 정보, 가장 최근 발생한 에러 이벤트 받아옴
  }, []);

  if (isLoading) {
    return (
      <div>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  if (!errorEvent) return null;
  const pathInfo = issue?.stack.split('\n')[1].split('/');
  const fileInfo = pathInfo[pathInfo.length - 1];

  return (
    <div className={classes.DetailContainer}>
      <div>
        <DetailHeader
          name={issue.name}
          fileInfo={fileInfo}
          message={issue.message}
          count={issue.errorEvents.length}
          issueId={issue._id}
          projectId={issue.projectId._id}
          members={issue.projectId.members}
          date={new Date(errorEvent.date).toLocaleString()}
        />
      </div>
      <div className={classes.switchContainer}>
        <Button
          disabled={currentErrorEventIdx - 1 < 0}
          /* 인덱스 벗어나면 버튼 비활성화 */
          onClick={prevErrorEventHandler}
          variant="outlined"
          className={classes.button}
          startIcon={<SkipPrevious />}
        >
          이전 이벤트
        </Button>
        <Button
          onClick={nextErrorEventHandler}
          disabled={
            currentErrorEventIdx + 1 >= issue.errorEvents.length
          } /* 인덱스 벗어나면 버튼 비활성화 */
          variant="outlined"
          className={classes.button}
          startIcon={<SkipNext />}
        >
          다음 이벤트
        </Button>
      </div>
      <ErrorEventInfo errorEvent={errorEvent} />
    </div>
  );
};

export default MainContainer;
